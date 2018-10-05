import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { BuildItemStatus } from "../../../common/models/BuildItemStatus";
import { IBuild } from "./../../../common/models/IBuild";
import Artifact from "./Artifact";
import PackerBuildConfig from "./PackerBuildConfig";
import PackerBuildStderr from "./PackerBuildStderr";
import PackerBuildStdout from "./PackerBuildStdout";

@Table
export default class PackerBuild extends Model<PackerBuild> implements IBuild {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @ForeignKey(() => PackerBuildConfig)
    @Column
    public PackerBuildConfigId: number;

    @BelongsTo(() => PackerBuildConfig)
    public PackerBuildConfig: PackerBuildConfig;

    @Column
    public BuildNumber?: number;

    @Column
    public BuildStatus: BuildItemStatus;

    @Column
    public ErrorMessage: string;

    @Column
    public QueueTime: Date;

    @Column
    public StartTime?: Date;

    @Column
    public FinishTime?: Date;

    @HasMany(() => PackerBuildStdout)
    public Stdout: PackerBuildStdout[];

    @HasMany(() => PackerBuildStderr)
    public Stderr: PackerBuildStderr[];

    @ForeignKey(() => Artifact)
    @Column
    public ArtifactId?: number;

    @HasOne(() => Artifact)
    public Artifact: Artifact;
}
