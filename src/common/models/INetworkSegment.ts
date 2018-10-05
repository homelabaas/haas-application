import { INetworkIPAssignment } from "./INetworkIPAssignment";

export interface INetworkSegment {
    Id?: number;
    Name: string;
    StartIP: string;
    EndIP: string;
    SubnetMask: string;
    DNS1: string;
    DNS2: string;
    Gateway: string;
    IPs?: INetworkIPAssignment[];
}
