import { AutoIncrement, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IBuildConfig } from "../../../common/models/IBuildConfig";
import BuilderDefinition from "./BuilderDefinition";
import PackerBuild from "./PackerBuild";

@Table
export default class PackerBuildConfig extends Model<PackerBuildConfig> implements IBuildConfig {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @Column
    public AppendBuildNumber: boolean;

    @Column
    public Name: string;

    @ForeignKey(() => BuilderDefinition)
    @Column
    public BuilderDefinitionId: string;

    @Column
    public LastBuildNumber: number;

    @Column
    public Datastore: string;

    @Column
    public Host: string;

    @Column
    public HostId: string;

    @Column
    public Cluster: string;

    @Column
    public ISO?: string;

    @Column
    public Network: string;

    @Column
    public SSHUsername: string;

    @Column
    public SSHPassword: string;

    @ForeignKey(() => PackerBuildConfig)
    @Column
    public TemplatePackerBuildId?: number;

    @Column
    public VMName: string;

    @HasMany(() => PackerBuild)
    public Builds: PackerBuild[];
}
