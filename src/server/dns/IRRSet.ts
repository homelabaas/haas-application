export interface IRRSetRecord {
    content: string;
    disabled: boolean;
}

export interface IRRSet {
    comments: any[];
    name: string;
    records: IRRSetRecord[];
    ttl: number;
    type: string;
}
