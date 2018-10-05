export interface ICreateRRSetRecord {
    content: string;
    disabled: boolean;
}

export interface ICreateRRSet {
    name: string;
    type: string;
    ttl: number;
    changetype: string;
    records: ICreateRRSetRecord[];
}

export interface ICreateZoneRecords {
    rrsets: ICreateRRSet[];
}
