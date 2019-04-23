import * as btoa from "btoa";
import * as bunyan from "bunyan";
import * as ip from "ip";
import { IMinioSettings } from "../../common/models/IMinioSettings";
import { IVirtualMachine } from "../../common/models/IVirtualMachine";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import VirtualMachine from "../data/models/VirtualMachine";
import { PostgresStore } from "../data/postgresStore";
import { Dependencies } from "../dependencyManager";
import { SocketManager } from "../socketio/socketManager";
import { IGuestinfoConfigSetting } from "../vmware/IGuestinfoConfigSetting";
import { NetworkConfiguration } from "./networkConfiguration";
import { PhoneHomeTaskLookups } from "./phoneHomeTaskLookup";

export class VmManager {

    public SocketManager: SocketManager;
    public Logger: bunyan;
    public PostgresStore: PostgresStore;
    public NetworkSegmentId: number;

    constructor(socketManager: SocketManager, logger: bunyan,
                postgresStore: PostgresStore) {
        this.SocketManager = socketManager;
        this.Logger = logger;
        this.PostgresStore = postgresStore;
    }

    public CreateNewRequest = async (newVm: IVirtualMachine): Promise<VirtualMachine> => {
        const newVMcreated = await Dependencies().PostgresStore.CreateNewVM(newVm);
        Dependencies().SocketManager.SendVMUpdate(newVMcreated);
        return newVMcreated;
    }

    public Provision = async (vmId: number, targetFolder: string, targetDatastore: string, phoneHomeUrl: string,
                              minioConfig: IMinioSettings) => {
        try {
            const vm = await this.PostgresStore.GetVM(vmId);
            this.NetworkSegmentId = vm.NetworkSegmentId;
            await this.updateStatus(vmId, VirtualMachineStatus.StartProvision, true);
            const artifact = await this.PostgresStore.GetArtifactById(vm.ArtifactId);
            const vmToClone = await Dependencies().VCenter.GetVMById(artifact.ResourceId);
            const vmSpec = await this.PostgresStore.GetVMSpec(vm.VMSpecId);
            this.Logger.info({VmId: vmId, vmToClone, vmSpec}, `Provision new VM. Begin clone.`);

            await this.updateStatus(vmId, VirtualMachineStatus.Clone);

            const newVm = await Dependencies().VCenter.CloneVM(vmToClone, targetFolder,
                vm.MachineName, targetDatastore);

            // Register for phone home to complete this process
            PhoneHomeTaskLookups().RegisterNewLookup(newVm.value, vmId, this.sendFinishMessage);

            const metaData = `local-hostname: ${vm.MachineName}\ninstance-id: ${newVm.value}`;
            const networkConfig = await this.getNetworkConfigYaml(vmId);
            await this.setVmDetails(vmId, networkConfig.ipAddress, newVm.value);

            const guestInfoSettings: IGuestinfoConfigSetting[] = [
                { key: "guestinfo.cloudconfig.metadata", value: btoa(metaData) },
                { key: "guestinfo.cloudconfig.userdata", value: vm.UserDataAsBase64 },
                { key: "guestinfo.cloudconfig.networkconfig", value: btoa(networkConfig.yaml) },
                { key: "guestinfo.cloudconfig.builderurl", value: phoneHomeUrl},
                { key: "guestinfo.minio.address", value: "http://" + minioConfig.Address + ":"
                    + minioConfig.Port },
                { key: "guestinfo.minio.accesskey", value: minioConfig.AccessKey },
                { key: "guestinfo.minio.secretkey", value: minioConfig.SecretKey },
                { key: "guestinfo.minio.bucket", value: minioConfig.ContentBucket },
            ];

            if (vm.EnvironmentName) {
                guestInfoSettings.push( { key: "guestinfo.cloudconfig.environment",
                    value: vm.EnvironmentName });
            }
            this.Logger.info({VmId: vmId,
                guestInfoSettings,
                cpus: vmSpec.CPUCount,
                ram: vmSpec.RAMinGB * 1024}, `Reconfigure new VM.`);

            await Dependencies().VCenter.ReconfigureVMByMob(newVm, guestInfoSettings,
                vmSpec.CPUCount, vmSpec.RAMinGB * 1024);
            await this.updateStatus(vmId, VirtualMachineStatus.StartVM);
            await this.setDnsEntry(vmId);
            await Dependencies().VCenter.TurnOnVMByMob(newVm);
        } catch (err) {
            this.Logger.error(`Error running provision for vm: ${vmId}`);
            this.Logger.error(err);
        }
    }

    public TerminateVm = async (vmId: number) => {
        try {
            const vm = await this.PostgresStore.GetVM(vmId);
            const vmToTerminate = await Dependencies().VCenter.GetVMById(vm.ResourceId);
            this.Logger.info(`Turning off VM id: ${vm.Id} name: ${vm.MachineName} vmId: ${vm.ResourceId}`);
            await Dependencies().VCenter.TurnOffVMByMob(vmToTerminate);
            await this.removeDnsEntry(vmId);
            await this.releaseIp(vm);
            await this.updateStatus(vmId, VirtualMachineStatus.Terminated, false, true);
        } catch (err) {
            this.Logger.error(`Error running terminate for vm: ${vmId}`);
            this.Logger.error(err);
        }
    }

    public CleanUp = async (vmId: number) => {
        try {
            const vm = await this.PostgresStore.GetVM(vmId);
            const vmToTerminate = await Dependencies().VCenter.GetVMById(vm.ResourceId);
            this.Logger.info(`Deleting VM id: ${vm.Id} name: ${vm.MachineName} vmId: ${vm.ResourceId}`);
            await Dependencies().VCenter.DestroyVMByMob(vmToTerminate);
            await this.updateStatus(vmId, VirtualMachineStatus.CleanedUp, false, true);
        } catch (err) {
            this.Logger.error(`Error running cleanup for vm: ${vmId}`);
            this.Logger.error(err);
        }
    }

    private setDnsEntry = async (vmId: number) => {
        const vm = await this.PostgresStore.GetVM(vmId);
        if (Dependencies().ServerStatus.PowerDNS) {
            this.Logger.info({VmId: vmId,
                domain: Dependencies().Settings.PowerDnsSettings.defaultDomain,
                ip: vm.NetworkIPAssignmentId}, "Add new DNS");
            await Dependencies().PowerDNS.updateZoneSimple(Dependencies().Settings.PowerDnsSettings.defaultDomain,
                "A", vm.MachineName, vm.NetworkIPAssignmentId);
        }
    }

    private removeDnsEntry = async (vmId: number) => {
        const vm = await this.PostgresStore.GetVM(vmId);
        if (Dependencies().ServerStatus.PowerDNS) {
            this.Logger.info({VmId: vmId,
                domain: Dependencies().Settings.PowerDnsSettings.defaultDomain,
                ip: vm.NetworkIPAssignmentId}, "Remove DNS");
            await Dependencies().PowerDNS.removeZoneSimple(Dependencies().Settings.PowerDnsSettings.defaultDomain,
                "A", vm.MachineName, vm.NetworkIPAssignmentId);
        }
    }

    private releaseIp = async (vm: VirtualMachine) => {
        if (vm.NetworkIPAssignmentId) {
            this.Logger.info({VmId: vm.Id, ip: vm.NetworkIPAssignmentId}, "Release IP Address");
            const networkIpAssignment = await this.PostgresStore.GetNetworkIPAssignment(vm.NetworkIPAssignmentId);
            networkIpAssignment.VirtualMachineId = null;
            this.PostgresStore.SaveNetworkIPAssignment(networkIpAssignment);
            vm.NetworkIPAssignmentId = null;
            await this.PostgresStore.SaveVM(vm);
        }
    }

    private updateStatus = async (vmId: number,
                                  status: VirtualMachineStatus,
                                  setCreationDateTime: boolean = false,
                                  setTerminateDateTime: boolean = false) => {
        const vmUpdate = await this.PostgresStore.GetVM(vmId);
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

    private getNetworkConfigYaml = async (vmId: number): Promise<{ yaml: string, ipAddress: string}> => {
        const networkSegment = await this.PostgresStore.GetNetworkSegment(this.NetworkSegmentId);
        const firstAvailableIp = networkSegment.IPs.find((p) => {
            return p.VirtualMachineId === null;
        });
        firstAvailableIp.VirtualMachineId = vmId;
        await this.PostgresStore.SaveNetworkIPAssignment(firstAvailableIp);
        const subnetMaskLength = ip.subnet(firstAvailableIp.IP, networkSegment.SubnetMask).subnetMaskLength;
        const cidr = firstAvailableIp.IP + "/" + subnetMaskLength;
        return {
            yaml: new NetworkConfiguration().GetNetworkConfigYamlStaticIp(cidr, networkSegment.Gateway,
                networkSegment.DNS1, networkSegment.DNS2),
            ipAddress: firstAvailableIp.IP
        };
    }

    private sendFinishMessage = async (vmId: number) => {
        await this.updateStatus(vmId, VirtualMachineStatus.Ready);
    }
}
