import { IVmwareObject } from "./IVmwareObject";

export interface IHostInformation {
    Datastores: IVmwareObject[];
    Networks: IVmwareObject[];
    Cluster: string;
    id: string;
    name: string;
}
