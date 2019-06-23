import * as vspherevim from "./definitions/vspherevim";
import { IGuestinfoConfigSetting } from "./IGuestinfoConfigSetting";
import { IVcenter } from "./IVcenter";

export class FakeVCenter implements IVcenter {

    public async GetVMIdByName(vmName: string): Promise<string> {
        return "vm-1234";
    }

    public GetVMById(vmId: string): Promise<vspherevim.vimService.vim.ManagedObjectReference> {
        throw new Error("Method not implemented.");
    }

    public CloneVM(vm: vspherevim.vimService.vim.ManagedObjectReference,
                   folderName: string,
                   name: string,
                   datastoreName: string): Promise<vspherevim.vimService.vim.ManagedObjectReference> {
        throw new Error("Method not implemented.");
    }

    public ReconfigureVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference,
                              configSettings: IGuestinfoConfigSetting[],
                              numCPUs: number,
                              memoryMB: number) {
        return;
    }

    public TurnOnVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference) {
        return;
    }

    public TurnOffVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference) {
        return;

    }

    public async GetHostById(hostId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async GetClusterById(clusterId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async BrowseDatastore(datastoreId: string, patternMatch: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    public async GetManagedObjects(
        type: string,
        ignoreMissing?: boolean,
        rootObject?: vspherevim.vimService.vim.ManagedObjectReference)
        : Promise<vspherevim.vimService.vim.RetrieveResult> {
        throw new Error("Method not implemented.");
    }

    public Disconnect(): Promise<void> {
        return;
    }

    public async Connect(hostname: string, username: string, password: string): Promise<void> {
        return;
    }

    public async GetEverything(objectToInspect: vspherevim.vimService.vim.ManagedObjectReference): Promise<any> {
        return;
    }

    public GetDatastoreById = async (datastoreId: string):
        Promise<vspherevim.vimService.vim.ManagedObjectReference> => {
        return;
    }

    public DestroyVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference) {
        return;
    }
}
