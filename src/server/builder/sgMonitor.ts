import * as bunyan from "bunyan";
import * as catnames from "cat-names";
import { EventLogLevel } from "../../common/EventLogLevel";
import { EventLogType } from "../../common/EventLogType";
import { IScalingGroup } from "../../common/models/IScalingGroup";
import { IVirtualMachine } from "../../common/models/IVirtualMachine";
import { ScalingGroupStatus } from "../../common/models/ScalingGroupStatus";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import { SocketManager } from "../socketio/socketManager";
import { PostgresStore } from "./../data/postgresStore";

export class SgMonitor {
    private PostgresStore: PostgresStore;
    private KeepRunning: boolean;
    private Logger: bunyan;
    private SocketManager: SocketManager;

    constructor(postgresStore: PostgresStore,
                socketManager: SocketManager,
                logger: bunyan) {
        this.KeepRunning = true;
        this.PostgresStore = postgresStore;
        this.Logger = logger;
        this.SocketManager = socketManager;
    }

    public LogEventInfo = async (message: string, vmId: number, eventdata?: any) => {
        await this.PostgresStore.CreateEventLog(EventLogType.ScalingGroup,
            message, EventLogLevel.Info, vmId, eventdata);
    }

    public LogEventWarning = async (message: string, vmId: number, eventdata?: any) => {
        await this.PostgresStore.CreateEventLog(EventLogType.ScalingGroup,
            message, EventLogLevel.Warning, vmId, eventdata);
    }

    public LogEventError = async (message: string, vmId: number, eventdata?: any) => {
        await this.PostgresStore.CreateEventLog(EventLogType.ScalingGroup,
            message, EventLogLevel.Error, vmId, eventdata);
    }

    public Run = () => {
        this.CheckStateChanges().then(() => {
            if (this.KeepRunning) {
                setTimeout(() => { this.Run(); }, 15000);
            }
        });
    }

    private formatName = (sg: IScalingGroup, name: string): string => {
        return `${sg.BaseMachineName}-${name}`;
    }

    private getFullServerName = (sg: IScalingGroup) => {
        let name: string = catnames.random().toLowerCase();
        // Make sure we dont already have the same server name
        while (sg.VirtualMachines.find((p) => p.MachineName === this.formatName(sg, name))) {
            name = catnames.random().toLowerCase();
        }
        return this.formatName(sg, name);
    }

    private createVirtualMachine = async (sg: IScalingGroup) => {
        const createVm: IVirtualMachine = {
            ArtifactId: sg.ArtifactId,
            MachineName: this.getFullServerName(sg),
            EnvironmentName: sg.EnvironmentName,
            ScalingGroupId: sg.Id,
            NetworkSegmentId: sg.NetworkSegmentId,
            Status: VirtualMachineStatus.Requested,
            UserDataAsBase64: sg.UserDataAsBase64,
            VMSpecId: sg.VMSpecId,
            Tags: sg.Tags
        };
        const vm = await this.PostgresStore.CreateNewVM(createVm);
        this.SocketManager.SendVMUpdate(vm);
        await this.LogEventInfo("Create new VM: " + createVm.MachineName, sg.Id);
    }

    private terminateVirtualMachine = async (sg: IScalingGroup) => {
        const vmToTerminate = sg.VirtualMachines.find((p) => p.Status === VirtualMachineStatus.Ready);
        const vm = await this.PostgresStore.GetVM(vmToTerminate.Id);
        vm.Status = VirtualMachineStatus.OrderTerminate;
        await this.PostgresStore.SaveVM(vm);
        await this.LogEventInfo("Order termination of VM: " + vm.MachineName, sg.Id);
        this.SocketManager.SendVMUpdate(vm);
    }

    private checkAndCreateOrDeleteServer = async (sg: IScalingGroup): Promise<boolean> => {
        let desiredCount = sg.DesiredCount;
        if (sg.Status === ScalingGroupStatus.Terminating || sg.Status === ScalingGroupStatus.Terminated) {
            desiredCount = 0;
        }
        let allServersReady = true;
        // We can safely ignore terminated servers
        const unterminatedServers = sg.VirtualMachines.filter((p) => {
            return p.Status !== VirtualMachineStatus.Terminated;
        });
        for (const vm of unterminatedServers) {
            if (vm.Status !== VirtualMachineStatus.Ready) {
                allServersReady = false;
            }
        }
        if (unterminatedServers.length < desiredCount && allServersReady) {
            await this.LogEventInfo("Current server count under capacity, provisioning new VM.", sg.Id);
            this.createVirtualMachine(sg);
        }
        if (unterminatedServers.length > desiredCount && allServersReady) {
            await this.LogEventInfo("Attempting termination of SG, terminating existing VM.", sg.Id);
            this.terminateVirtualMachine(sg);
        }
        return (allServersReady && unterminatedServers.length === desiredCount);
    }

    private updateSg = async (sg: IScalingGroup) => {
        const scalingGroup = await this.PostgresStore.GetSG(sg.Id);
        Object.assign(scalingGroup, sg);
        await this.PostgresStore.SaveSG(scalingGroup);
        this.SocketManager.SendSGUpdate(sg);
    }

    private CheckStateChanges = async () => {
        try {
            const scalingGroups = await this.PostgresStore.GetSGs(true);
            for (const sg of scalingGroups) {
                switch (sg.Status) {
                    case ScalingGroupStatus.New:
                        sg.Status = ScalingGroupStatus.Creating;
                        this.updateSg(sg);
                        await this.checkAndCreateOrDeleteServer(sg);
                        break;
                    case ScalingGroupStatus.Stable:
                    case ScalingGroupStatus.Creating:
                    case ScalingGroupStatus.ScalingUp:
                    case ScalingGroupStatus.ScalingDown:
                        if (await this.checkAndCreateOrDeleteServer(sg)) {
                            sg.Status = ScalingGroupStatus.Stable;
                            await this.updateSg(sg);
                        }
                        break;
                    case ScalingGroupStatus.OrderTerminate:
                        sg.Status = ScalingGroupStatus.Terminating;
                        await this.updateSg(sg);
                        await this.checkAndCreateOrDeleteServer(sg);
                        break;
                    case ScalingGroupStatus.Terminating:
                        if (await this.checkAndCreateOrDeleteServer(sg)) {
                            sg.Status = ScalingGroupStatus.Terminated;
                            await this.updateSg(sg);
                        }
                        break;
                    default:
                        break;
                }
            }
        } catch (err) {
            this.Logger.error(err.message);
            this.Logger.error(JSON.stringify(err));
        }
    }
}
