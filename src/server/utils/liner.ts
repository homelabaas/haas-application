import { Transform, TransformCallback } from "stream";
import { IBuildOutputLine } from "../../common/models/IBuildOutputLine";

export class Liner extends Transform {
    private lastLineData?: string;
    private BuildId: number;

    constructor(buildId: number, sendMessageFunction?: (buildId: number, logMessage: IBuildOutputLine) => void) {
        super({
            objectMode: true,
            transform: (chunk: any, encoding: string, callback: TransformCallback) => {
                let dataIn = chunk.toString();
                if (this.lastLineData) { dataIn = this.lastLineData + dataIn; }
                const lines = dataIn.split("\n");
                this.lastLineData = lines.splice(lines.length - 1, 1)[0];
                const messageBuildId = this.BuildId;
                lines.map((p) => (
                    {
                        Text: p,
                        DateTimeStamp: new Date(),
                        PackerBuildId: this.BuildId
                    } as IBuildOutputLine))
                    .forEach((q: IBuildOutputLine) => {
                        this.push(q);
                        if (sendMessageFunction) {
                            sendMessageFunction(messageBuildId, q);
                        }
                    });
                callback();
            },
            flush: (callback: TransformCallback) => {
                if (this.lastLineData) {
                    this.push({
                        Text: this.lastLineData,
                        DateTimeStamp: new Date(),
                        PackerBuildId: this.BuildId
                    });
                }
                this.lastLineData = undefined;
                callback();
            }
        });
        this.BuildId = buildId;
    }
}
