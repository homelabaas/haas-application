import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IBuildOutputLine } from "../../../common/models/IBuildOutputLine";
import PackerBuild from "./PackerBuild";

@Table
export default class PackerBuildStdout extends Model<PackerBuildStdout> implements IBuildOutputLine {

    @AutoIncrement
    @PrimaryKey
    @Column
    public Id: number;

    @ForeignKey(() => PackerBuild)
    @Column
    public PackerBuildId: number;

    @Column
    public DateTimeStamp: Date;

    @Column
    public Text: string;

}
