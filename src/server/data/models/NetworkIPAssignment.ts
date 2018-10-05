import { BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { INetworkIPAssignment } from "../../../common/models/INetworkIPAssignment";
import NetworkSegment from "./NetworkSegment";
import VirtualMachine from "./VirtualMachine";

@Table
export default class NetworkIPAssignment extends Model<NetworkIPAssignment> implements INetworkIPAssignment {

    @PrimaryKey
    @Column
    public IP: string;

    @ForeignKey(() => NetworkSegment)
    @Column
    public NetworkSegmentId: number;

    @BelongsTo(() => NetworkSegment)
    public NetworkSegment: NetworkSegment;

    @ForeignKey(() => VirtualMachine)
    @Column
    public VirtualMachineId?: number;

    @HasOne(() => VirtualMachine)
    public VirtualMachine?: VirtualMachine;

}
