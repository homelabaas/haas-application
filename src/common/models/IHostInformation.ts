import { IVmwareObject } from "./IVmwareObject";

export interface IHostInformation {
    Datastores: IVmwareObject[];
    Networks: IVmwareObject[];
    id: string;
    name: string;
}
