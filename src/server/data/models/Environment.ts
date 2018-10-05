import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IEnvironment } from "../../../common/models/IEnvironment";
import { IEnvironmentDefinition } from "../../../common/models/IEnvironmentDefinition";
import ScalingGroup from "./ScalingGroup";

@Table
export default class Environment extends Model<Environment> implements IEnvironment {

    @PrimaryKey
    @AutoIncrement
    @Column
    public Id: number;

    @Column
    public Name: string;

    @Column
    public VMPrefix: string;

    @Column
    public Status: number;

    @Column({
        type: DataType.JSONB
    })
    public EnvironmentDefinition: IEnvironmentDefinition;

    @HasMany(() => ScalingGroup)
    public ScalingGroups: ScalingGroup[];

    @Column({
        type: DataType.JSONB
    })
    public Tags?: any;
}
