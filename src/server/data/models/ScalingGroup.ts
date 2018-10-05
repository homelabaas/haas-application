import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IScalingGroup } from "../../../common/models/IScalingGroup";
import Artifact from "./Artifact";
import Environment from "./Environment";
import NetworkSegment from "./NetworkSegment";
import VirtualMachine from "./VirtualMachine";
import VMSpec from "./VMSpec";
@Table
export default class ScalingGroup extends Model<ScalingGroup> implements IScalingGroup {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @Column
    public Status: number;

    @ForeignKey(() => Environment)
    @Column
    public EnvironmentId?: number;

    @BelongsTo(() => Environment)
    public Environment?: Environment;

    @ForeignKey(() => Artifact)
    @Column
    public ArtifactId?: number;

    @BelongsTo(() => Artifact)
    public Artifact?: Artifact;

    @ForeignKey(() => NetworkSegment)
    @Column
    public NetworkSegmentId: number;

    @BelongsTo(() => NetworkSegment)
    public NetworkSegment: NetworkSegment;

    @Column({
        type: DataType.TEXT
    })
    public UserDataAsBase64: string;

    @Column
    public BaseMachineName: string;

    @Column
    public EnvironmentName: string;

    @Column
    public DesiredCount: number;

    @ForeignKey(() => VMSpec)
    @Column
    public VMSpecId: number;

    @BelongsTo(() => VMSpec)
    public VMSpec: VMSpec;

    @HasMany(() => VirtualMachine)
    public VirtualMachines: VirtualMachine[];

    @Column({
        type: DataType.JSONB
    })
    public Tags?: any;
}
