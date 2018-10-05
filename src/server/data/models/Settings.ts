import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export default class Settings extends Model<Settings> {

    @PrimaryKey
    @Column
    public Group: string;

    @PrimaryKey
    @Column
    public Key: string;

    @Column
    public Value: string;

}
