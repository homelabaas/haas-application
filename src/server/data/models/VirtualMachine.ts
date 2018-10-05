import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IVirtualMachine } from "../../../common/models/IVirtualMachine";
import Artifact from "./Artifact";
import NetworkIPAssignment from "./NetworkIPAssignment";
import NetworkSegment from "./NetworkSegment";
import ScalingGroup from "./ScalingGroup";
import VMSpec from "./VMSpec";

@Table
export default class VirtualMachine extends Model<VirtualMachine> implements IVirtualMachine {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @ForeignKey(() => Artifact)
    @Column
    public ArtifactId: number;

    @BelongsTo(() => Artifact)
    public Artifact: Artifact;

    @Column({
        type: DataType.TEXT
    })
    public UserDataAsBase64: string;

    @Column
    public MachineName: string;

    @Column
    public EnvironmentName?: string;

    @Column
    public Status: number;

    @ForeignKey(() => VMSpec)
    @Column
    public VMSpecId: number;

    @BelongsTo(() => VMSpec)
    public VMSpec: VMSpec;

    @ForeignKey(() => NetworkIPAssignment)
    @Column
    public NetworkIPAssignmentId?: string;

    @BelongsTo(() => NetworkIPAssignment)
    public NetworkIPAssignment?: NetworkIPAssignment;

    @ForeignKey(() => NetworkSegment)
    @Column
    public NetworkSegmentId?: number;

    @ForeignKey(() => ScalingGroup)
    @Column
    public ScalingGroupId?: number;

    @BelongsTo(() => ScalingGroup)
    public ScalingGroup?: ScalingGroup;

    @Column
    public ResourceId?: string;

    @Column
    public CreateDateTime?: Date;

    @Column
    public TerminateDateTime?: Date;

    @Column({
        type: DataType.JSONB
    })
    public Tags?: any;
}
