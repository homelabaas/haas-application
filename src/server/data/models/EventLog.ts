import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IEventLog } from "../../../common/models/IEventLog";

@Table({
    indexes: [
        {
            unique: false,
            fields: [
                "ObjectType",
                "ObjectId",
                "DateTimeStamp"
            ]
        }
    ]
})
export default class EventLog extends Model<EventLog> implements IEventLog {

    @AutoIncrement
    @PrimaryKey
    @Column
    public Id: number;

    @Column
    public ObjectType: string;

    @Column
    public ObjectId: number;

    @Column
    public DateTimeStamp: Date;

    @Column
    public Level: string;

    @Column
    public EventText: string;

    @Column({
        type: DataType.JSONB
    })
    public StructuredEventData?: any;
}
