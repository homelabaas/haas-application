import { IRRSet } from "./IRRSet";

export interface IDnsZone {
    account: string;
    api_rectify: boolean;
    dnssec: boolean;
    id: string;
    kind: string;
    last_check: number;
    masters: any[];
    name: string;
    notified_serial: number;
    nsec3narrow: boolean;
    nsec3param: string;
    rrsets: IRRSet[];
    serial: number;
    soa_edit: string;
    soa_edit_api: string;
    url: string;
}
