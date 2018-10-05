import { EnvironmentStatus } from "./EnvironmentStatus";
import { IEnvironmentDefinition } from "./IEnvironmentDefinition";
import { IScalingGroup } from "./IScalingGroup";

export interface IEnvironment {
    Id?: number;
    Name: string;
    EnvironmentDefinition: IEnvironmentDefinition;
    VMPrefix: string;
    Status: EnvironmentStatus;
    ScalingGroups?: IScalingGroup[];
    Tags?: any;
}
