import * as request from "request";
import { ICreateZone } from "./ICreateZone";
import { ICreateZoneRecords } from "./ICreateZoneRecords";
import { IDnsZone } from "./IDnsZone";
import { IDnsZoneListItem } from "./IDnsZoneListItem";
import { IPowerDNS } from "./IPowerDns";

export class PowerDNS implements IPowerDNS {

    private url: string;
    private port: number;
    private apiKey: string;
    private server: string;
    private version: string;
    private baseUrl: string;
    private request: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

    constructor(url, apiKey, version = "v1", server = "localhost") {
        const supportedVersions = ["v1"];
        if (supportedVersions.indexOf(version) === -1) {
            throw new Error(`Version '${version}' is not one of [${supportedVersions}].`);
        }
        this.url = url;
        this.apiKey = apiKey;
        this.server = server;
        this.version = version;
        this.baseUrl = `${url}/api/${version}/servers/${server}`;
        this.request = request.defaults({
            headers: {
                "X-API-Key": this.apiKey,
                "Accept": "application/json"
            },
            baseUrl: this.baseUrl,
            json: true
        });
    }

    public getZones = (): Promise<IDnsZoneListItem[]> => {
        return new Promise((resolve, reject) => {
            this.request("/zones", (err, response, body) => {
                const failure = err || ((response.statusCode >= 300) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve(body);
            });
        });
    }

    public getZone = (zoneName: string): Promise<IDnsZone> => {
        return new Promise((resolve, reject) => {
            this.request(`/zones/${zoneName}`, (err, response, body) => {
                const failure = err || ((response.statusCode >= 300) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve(body);
            });
        });
    }

    public createZone = (zone: ICreateZone) => {
        return new Promise((resolve, reject) => {
            this.request({
                url: "/zones",
                method: "POST",
                body: zone
            }, (err, response, body) => {
                const failure = err || ((response.statusCode >= 300) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve(body);
            });
        });
    }

    public removeZoneSimple = async (zoneName: string, type: string, dnsName: string, ipAddress: string) => {
        const newRRset: ICreateZoneRecords = {
            rrsets: [
                {
                    name: dnsName + "." + zoneName + ".",
                    type,
                    ttl: 120,
                    changetype: "DELETE",
                    records: [
                        {
                            content: ipAddress,
                            disabled: false
                        }
                    ]
                }
            ]
        };
        await this.updateZone(zoneName, newRRset);
    }

    public updateZoneSimple = async (zoneName: string, type: string, dnsName: string, ipAddress: string) => {
        const newRRset: ICreateZoneRecords = {
            rrsets: [
                {
                    name: dnsName + "." + zoneName + ".",
                    type,
                    ttl: 120,
                    changetype: "REPLACE",
                    records: [
                        {
                            content: ipAddress,
                            disabled: false
                        }
                    ]
                }
            ]
        };
        await this.updateZone(zoneName, newRRset);
    }

    public updateZone = (zoneName: string, rrsets: ICreateZoneRecords) => {
        return new Promise((resolve, reject) => {
            this.request({
                url: `/zones/${zoneName}`,
                method: "PATCH",
                body: rrsets
            }, (err, response) => {
                const failure = err || ((response.statusCode >= 300) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve();
            });
        });
    }

    public notifyZone(zoneName) {
        return new Promise((resolve, reject) => {
            this.request({
                url: `/zones/${zoneName}/notify`,
                method: "PUT",
            }, (err, response, body) => {
                const failure = err || ((response.statusCode !== 204) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve(body);
            });
        });
    }

    public retrieveZone(zoneName) {
        return new Promise((resolve, reject) => {
            this.request({
                url: `/zones/${zoneName}/axfr-retrieve`,
                method: "PUT",
            }, (err, response, body) => {
                const failure = err || ((response.statusCode >= 300) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve(body);
            });
        });
    }

    public exportZone(zoneName) {
        return new Promise((resolve, reject) => {
            this.request({
                url: `/zones/${zoneName}/export`,
                method: "GET",
            }, (err, response, body) => {
                const failure = err || ((response.statusCode >= 300) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve(body);
            });
        });
    }

    public deleteZone(zoneName) {
        return new Promise((resolve, reject) => {
            this.request({
                url: `/zones/${zoneName}`,
                method: "DELETE",
            }, (err, response, body) => {
                const failure = err || ((response.statusCode >= 300) ?
                    new Error(JSON.stringify(response.body)) : false);
                if (failure) {
                    return reject(failure);
                }
                return resolve(body);
            });
        });
    }
}
