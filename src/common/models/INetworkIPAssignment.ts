import { INetworkSegment } from "./INetworkSegment";
import { IVirtualMachine } from "./IVirtualMachine";

export interface INetworkIPAssignment {
    IP: string;
    NetworkSegmentId: number;
    NetworkSegment?: INetworkSegment;
    VirtualMachineId?: number;
    VirtualMachine?: IVirtualMachine;
}
