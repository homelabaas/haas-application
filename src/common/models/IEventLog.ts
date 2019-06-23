export interface IEventLog {
    Id?: number;
    ObjectType: string;
    ObjectId: number;
    DateTimeStamp: Date;
    Level: string;
    EventText: string;
    StructuredEventData?: any;
}
