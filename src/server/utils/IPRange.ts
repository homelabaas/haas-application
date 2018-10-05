import * as ip from "ip";

export class IPRange {
    public StartIP: string;
    public EndIP: string;
    constructor(startIP: string, endIP: string) {
        this.StartIP = startIP;
        this.EndIP = endIP;
    }

    public GetRange = (): string[] => {
        if (!ip.isV4Format(this.StartIP)) {
            throw new Error("Starting IP is not a valid v4 IP.");
        }

        if (!ip.isV4Format(this.EndIP)) {
            throw new Error("End IP is not a valid v4 IP.");
        }

        const startBufferVal = ip.toBuffer(this.StartIP);
        const endBufferVal = ip.toBuffer(this.EndIP);

        if (startBufferVal[0] === endBufferVal[0] &&
            startBufferVal[1] === endBufferVal[1] &&
            startBufferVal[2] === endBufferVal[2]) {
            return this.calulateRange(startBufferVal, endBufferVal);
        } else {
            throw new Error("Only simple ranges on the last octet are supported.");
        }
    }

    private calulateRange = (startBuffer: Buffer, endBuffer: Buffer): string[] => {
        const returnIps: string[] = [];
        for (let i = startBuffer[3]; i <= endBuffer[3]; i++) {
            returnIps.push(ip.toString(new Buffer([startBuffer[0], startBuffer[1], startBuffer[2], i])));
        }
        return returnIps;
    }

}
