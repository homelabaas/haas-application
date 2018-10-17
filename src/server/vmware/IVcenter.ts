import * as vspherevim from "./definitions/vspherevim";
import { IGuestinfoConfigSetting } from "./IGuestinfoConfigSetting";

export interface IVcenter {
    Connect(hostname: string, username: string, password: string): Promise<void>;
    Disconnect(): Promise<void>;
    GetManagedObjects(type: string,
                      ignoreMissing?: boolean,
                      rootObject?: vspherevim.vimService.vim.ManagedObjectReference)
                      : Promise<vspherevim.vimService.vim.RetrieveResult>;
    BrowseDatastore(datastoreId: string, patternMatch: string): Promise<any[]>;
    GetHostById(hostId: string): Promise<any>;
    GetVMIdByName(vmName: string): Promise<string>;
    GetVMById(vmId: string): Promise<vspherevim.vimService.vim.ManagedObjectReference>;
    CloneVM(vm: vspherevim.vimService.vim.ManagedObjectReference, folderName: string, name: string,
            datastoreName: string): Promise<vspherevim.vimService.vim.ManagedObjectReference>;
    ReconfigureVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference,
                       configSettings: IGuestinfoConfigSetting[],
                       numCPUs: number,
                       memoryMB: number);
    TurnOnVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference);
    TurnOffVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference);
    GetEverything(objectToInspect: vspherevim.vimService.vim.ManagedObjectReference): Promise<any>;
    GetDatastoreById(datastoreId: string): Promise<vspherevim.vimService.vim.ManagedObjectReference>;
    DestroyVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference);
}
