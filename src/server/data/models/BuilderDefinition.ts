import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IBuildType } from "../../../common/models/IBuildType";

@Table
export default class BuilderDefinition extends Model<BuilderDefinition> implements IBuildType {

    @PrimaryKey
    @Column
    public Id: string;

    @Column
    public File: string;

    @Column
    public Name: string;

    @Column
    public Type: string;

    @Column
    public Requirement?: string;

    @Column
    public Feature?: string;
}
