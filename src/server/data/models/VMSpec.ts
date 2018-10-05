import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IVMSpec } from "../../../common/models/IVMSpec";

@Table
export default class VMSpec extends Model<VMSpec> implements IVMSpec {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @Column
    public Name: string;

    @Column
    public CPUCount: number;

    @Column
    public RAMinGB: number;

}
