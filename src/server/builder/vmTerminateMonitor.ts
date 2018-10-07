import * as bunyan from "bunyan";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import { SocketManager } from "../socketio/socketManager";
import { PostgresStore } from "./../data/postgresStore";
import { VmManager } from "./vmManager";

export class VmTerminateMonitor {
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

    public Run = () => {
        this.CheckTerminateVM().then(() => {
            if (this.KeepRunning) {
                setTimeout(() => { this.Run(); }, 5000);
            }
        });
    }

    private CheckTerminateVM = async () => {
        try {
            const newVMs = await this.PostgresStore.GetTerminateVMs();
            if (newVMs.length > 0) {
                this.Logger.info(`Found ${newVMs.length} VMs to terminate.`);
            }
            for (const vm of newVMs) {
                const vmUpdate = await this.PostgresStore.GetVM(vm.Id);
                vmUpdate.Status = VirtualMachineStatus.Terminating;
                await this.PostgresStore.SaveVM(vmUpdate);
                this.SocketManager.SendVMUpdate(vmUpdate);
                const terminateTask = new VmManager(vm.Id, this.SocketManager, this.Logger,
                    this.PostgresStore);
                setImmediate(terminateTask.TerminateVm);
            }
        } catch (err) {
            this.Logger.error(err.message);
            this.Logger.error(JSON.stringify(err));
        }
    }
}
