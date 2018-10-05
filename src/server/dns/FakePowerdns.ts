import { IDnsZoneListItem } from "./IDnsZoneListItem";
import { IPowerDNS } from "./IPowerDns";

export class FakePowerdns implements IPowerDNS {

    constructor(url, apiKey, version = "v1", server = "localhost") {
        return;
    }

    public getZones(): Promise<IDnsZoneListItem[]> {
        return new Promise((resolve) => {
            resolve([
                {
                    account: "account",
                    dnssec: false,
                    id: "id",
                    kind: "A",
                    last_check: 0,
                    masters: [],
                    name: "test",
                    notified_serial: 0,
                    serial: 0,
                    url: "url"
                }
            ]);
        });
    }

    public updateZoneSimple(zoneName: string, type: string, dnsName: string, ipAddress: string) {
        return;
    }

    public removeZoneSimple(zoneName: string, type: string, dnsName: string, ipAddress: string) {
        return;
    }
}
