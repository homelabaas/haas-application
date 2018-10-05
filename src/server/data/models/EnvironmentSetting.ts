import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export default class EnvironmentSetting extends Model<EnvironmentSetting> {

    @PrimaryKey
    @Column
    public EnvironmentName: string;

    @PrimaryKey
    @Column
    public Key: string;

    @Column
    public Value: string;

}
