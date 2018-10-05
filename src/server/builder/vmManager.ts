import * as btoa from "btoa";
import * as bunyan from "bunyan";
import * as ip from "ip";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import VirtualMachine from "../data/models/VirtualMachine";
import { PostgresStore } from "../data/postgresStore";
import { Dependencies, IMinioConfig } from "../dependencyManager";
import { SocketManager } from "../socketio/socketManager";
import { IGuestinfoConfigSetting } from "../vmware/IGuestinfoConfigSetting";
import { NetworkConfiguration } from "./networkConfiguration";
import { PhoneHomeTaskLookups } from "./phoneHomeTaskLookup";

export class VmManager {

    public VmId: number;
    public SocketManager: SocketManager;
    public Logger: bunyan;
    public PostgresStore: PostgresStore;
    public NetworkSegmentId: number;

    constructor(vmId: number, socketManager: SocketManager, logger: bunyan,
                postgresStore: PostgresStore) {
        this.VmId = vmId;
        this.SocketManager = socketManager;
        this.Logger = logger;
        this.PostgresStore = postgresStore;
    }

    public Provision = async (targetFolder: string, targetDatastore: string, phoneHomeUrl: string,
                              minioConfig: IMinioConfig) => {
        try {
            const vm = await this.PostgresStore.GetVM(this.VmId);
            this.NetworkSegmentId = vm.NetworkSegmentId;
            await this.updateStatus(VirtualMachineStatus.StartProvision, true);
            const artifact = await this.PostgresStore.GetArtifactById(vm.ArtifactId);
            const vmToClone = await Dependencies().VCenter.GetVMById(artifact.ResourceId);
            const vmSpec = await this.PostgresStore.GetVMSpec(vm.VMSpecId);

            await this.updateStatus(VirtualMachineStatus.Clone);

            const newVm = await Dependencies().VCenter.CloneVM(vmToClone, targetFolder,
                vm.MachineName, targetDatastore);

            // Register for phone home to complete this process
            PhoneHomeTaskLookups().RegisterNewLookup(newVm.value, this.VmId, this.sendFinishMessage);

            const metaData = `local-hostname: ${vm.MachineName}\ninstance-id: ${newVm.value}`;
            const networkConfig = await this.getNetworkConfigYaml();
            await this.setVmDetails(this.VmId, networkConfig.ipAddress, newVm.value);

            const guestInfoSettings: IGuestinfoConfigSetting[] = [
                { key: "guestinfo.cloudconfig.metadata", value: btoa(metaData) },
                { key: "guestinfo.cloudconfig.userdata", value: vm.UserDataAsBase64 },
                { key: "guestinfo.cloudconfig.networkconfig", value: btoa(networkConfig.yaml) },
                { key: "guestinfo.cloudconfig.builderurl", value: phoneHomeUrl},
                { key: "guestinfo.minio.address", value: "http://" + minioConfig.URL + ":"
                    + minioConfig.Port },
                { key: "guestinfo.minio.accesskey", value: minioConfig.AccessKey },
                { key: "guestinfo.minio.secretkey", value: minioConfig.SecretKey },
                { key: "guestinfo.minio.bucket", value: minioConfig.ContentBucket },
            ];

            if (vm.EnvironmentName) {
                guestInfoSettings.push( { key: "guestinfo.cloudconfig.environment",
                    value: vm.EnvironmentName });
            }

            await Dependencies().VCenter.ReconfigureVMByMob(newVm, guestInfoSettings,
                vmSpec.CPUCount, vmSpec.RAMinGB * 1024);
            await this.updateStatus(VirtualMachineStatus.StartVM);
            await this.setDnsEntry();
            await Dependencies().VCenter.TurnOnVMByMob(newVm);
        } catch (err) {
            this.Logger.error(`Error running provision for vm: ${this.VmId}`);
            this.Logger.error(err);
        }
    }

    public TerminateVm = async () => {
        try {
            const vm = await this.PostgresStore.GetVM(this.VmId);
            const vmToTerminate = await Dependencies().VCenter.GetVMById(vm.ResourceId);
            await Dependencies().VCenter.TurnOffVMByMob(vmToTerminate);
            await this.removeDnsEntry();
            await this.releaseIp(vm);
            await this.updateStatus(VirtualMachineStatus.Terminated, false, true);
        } catch (err) {
            this.Logger.error(`Error running terminate for vm: ${this.VmId}`);
            this.Logger.error(err);
        }
    }

    private setDnsEntry = async () => {
        const vm = await this.PostgresStore.GetVM(this.VmId);
        if (Dependencies().ServerStatus.PowerDNS) {
            await Dependencies().PowerDNS.updateZoneSimple(Dependencies().Settings.PowerDnsSettings.defaultDomain,
                "A", vm.MachineName, vm.NetworkIPAssignmentId);
        }
    }

    private removeDnsEntry = async () => {
        const vm = await this.PostgresStore.GetVM(this.VmId);
        if (Dependencies().ServerStatus.PowerDNS) {
            await Dependencies().PowerDNS.removeZoneSimple(Dependencies().Settings.PowerDnsSettings.defaultDomain,
                "A", vm.MachineName, vm.NetworkIPAssignmentId);
        }
    }

    private releaseIp = async (vm: VirtualMachine) => {
        if (vm.NetworkIPAssignmentId) {
            const networkIpAssignment = await this.PostgresStore.GetNetworkIPAssignment(vm.NetworkIPAssignmentId);
            networkIpAssignment.VirtualMachineId = null;
            this.PostgresStore.SaveNetworkIPAssignment(networkIpAssignment);
            vm.NetworkIPAssignmentId = null;
            await this.PostgresStore.SaveVM(vm);
        }
    }

    private updateStatus = async (status: VirtualMachineStatus,
                                  setCreationDateTime: boolean = false,
                                  setTerminateDateTime: boolean = false) => {
        const vmUpdate = await this.PostgresStore.GetVM(this.VmId);
        vmUpdate.Status = status;
        if (setCreationDateTime) {
            vmUpdate.CreateDateTime = new Date();
        }
        if (setTerminateDateTime) {
            vmUpdate.TerminateDateTime = new Date();
        }
        await this.PostgresStore.SaveVM(vmUpdate);
        this.SocketManager.SendVMUpdate(vmUpdate);
    }

    private setVmDetails = async (vmId: number, ipToAssign: string, resourceId: string) => {
        const vm = await this.PostgresStore.GetVM(vmId);
        vm.NetworkIPAssignmentId = ipToAssign;
        vm.ResourceId = resourceId;
        await this.PostgresStore.SaveVM(vm);
    }

    private getNetworkConfigYaml = async (): Promise<{ yaml: string, ipAddress: string}> => {
        const networkSegment = await this.PostgresStore.GetNetworkSegment(this.NetworkSegmentId);
        const firstAvailableIp = networkSegment.IPs.find((p) => {
            return p.VirtualMachineId === null;
        });
        firstAvailableIp.VirtualMachineId = this.VmId;
        await this.PostgresStore.SaveNetworkIPAssignment(firstAvailableIp);
        const subnetMaskLength = ip.subnet(firstAvailableIp.IP, networkSegment.SubnetMask).subnetMaskLength;
        const cidr = firstAvailableIp.IP + "/" + subnetMaskLength;
        return {
            yaml: new NetworkConfiguration().GetNetworkConfigYamlStaticIp(cidr, networkSegment.Gateway,
                networkSegment.DNS1, networkSegment.DNS2),
            ipAddress: firstAvailableIp.IP
        };
    }

    private sendFinishMessage = async () => {
        await this.updateStatus(VirtualMachineStatus.Ready);
    }
}
