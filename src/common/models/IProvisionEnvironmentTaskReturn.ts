import { ProvisionTaskType } from "./ProvisionTaskType";
export interface IProvisionEnvironmentTaskReturn {
    TaskId: string;
    ServerTasks: IProvisionEnvUpdate[];
}

export interface IProvisionEnvUpdate {
    stepnumber: number;
    subtaskid: string;
    stepType: ProvisionTaskType;
    statusUpdate: any;
}
