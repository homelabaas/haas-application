import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { INetworkSegment } from "../../../common/models/INetworkSegment";
import NetworkIPAssignment from "./NetworkIPAssignment";

@Table
export default class NetworkSegment extends Model<NetworkSegment> implements INetworkSegment {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @Column
    public Name: string;

    @Column
    public StartIP: string;

    @Column
    public EndIP: string;

    @Column
    public SubnetMask: string;

    @Column
    public DNS1: string;

    @Column
    public DNS2: string;

    @Column
    public Gateway: string;

    @HasMany(() => NetworkIPAssignment)
    public IPs: NetworkIPAssignment[];
}
