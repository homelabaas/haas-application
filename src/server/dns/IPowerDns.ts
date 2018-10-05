import { IDnsZoneListItem } from "./IDnsZoneListItem";

export interface IPowerDNS {
    getZones(): Promise<IDnsZoneListItem[]>;
    updateZoneSimple(zoneName: string, type: string, dnsName: string, ipAddress: string);
    removeZoneSimple(zoneName: string, type: string, dnsName: string, ipAddress: string);
}
