import { IArtifact } from "./IArtifact";
import { IEnvironment } from "./IEnvironment";
import { INetworkSegment } from "./INetworkSegment";
import { IVirtualMachine } from "./IVirtualMachine";
import { IVMSpec } from "./IVMSpec";

export interface IScalingGroup {
    Id?: number;
    Status: number;
    EnvironmentId?: number;
    Environment?: IEnvironment;
    ArtifactId?: number;
    Artifact?: IArtifact;
    NetworkSegmentId: number;
    NetworkSegment?: INetworkSegment;
    UserDataAsBase64: string;
    BaseMachineName: string;
    EnvironmentName: string;
    DesiredCount: number;
    VMSpecId: number;
    VMSpec?: IVMSpec;
    VirtualMachines?: IVirtualMachine[];
    Tags?: any;
}
