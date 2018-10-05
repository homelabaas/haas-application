import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IArtifact } from "../../../common/models/IArtifact";
import PackerBuild from "./PackerBuild";
import VirtualMachine from "./VirtualMachine";

@Table
export default class Artifact extends Model<Artifact> implements IArtifact {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @ForeignKey(() => PackerBuild)
    @Column
    public PackerBuildId: number;

    @BelongsTo(() => PackerBuild)
    public PackerBuild: PackerBuild;

    @Column
    public Feature?: string;

    @Column
    public Name: string;

    @Column
    public RegisterTime: Date;

    @Column
    public ResourceId: string;

    @Column
    public Type: string;

    @HasMany(() => VirtualMachine)
    public VirtualMachines: VirtualMachine[];
}
