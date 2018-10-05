export interface IDnsZoneListItem {
    account: string;
    dnssec: boolean;
    id: string;
    kind: string;
    last_check: number;
    masters: any[];
    name: string;
    notified_serial: number;
    serial: number;
    url: string;
}
