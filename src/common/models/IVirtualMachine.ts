import { IArtifact } from "./IArtifact";
import { INetworkIPAssignment } from "./INetworkIPAssignment";
import { IScalingGroup } from "./IScalingGroup";
import { IVMSpec } from "./IVMSpec";
import { VirtualMachineStatus } from "./VirtualMachineStatus";

export interface IVirtualMachine {
    Id?: number;
    Artifact?: IArtifact;
    ArtifactId?: number;
    UserDataAsBase64: string;
    MachineName: string;
    EnvironmentName?: string;
    Status: VirtualMachineStatus;
    NetworkIPAssignment?: INetworkIPAssignment;
    NetworkIPAssignmentId?: string;
    ScalingGroup?: IScalingGroup;
    ScalingGroupId?: number;
    VMSpec?: IVMSpec;
    VMSpecId?: number;
    NetworkSegmentId?: number;
    ResourceId?: string;
    CreateDateTime?: Date;
    TerminateDateTime?: Date;
    Tags?: any;
}
