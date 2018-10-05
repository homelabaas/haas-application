import { Writable } from "stream";
import { IBuildOutputLine } from "../../common/models/IBuildOutputLine";
import PackerBuildStderr from "../data/models/PackerBuildStderr";

export class DbAppendStderrStream extends Writable {

    constructor() {
        super({ objectMode: true});
    }

    public _write(chunk: any, encoding: string, callback: (err?: Error) => void) {
        const typedChunk: IBuildOutputLine = chunk as IBuildOutputLine;
        const stdErrRow = PackerBuildStderr.build({
            DateTimeStamp: typedChunk.DateTimeStamp,
            Text: typedChunk.Text,
            PackerBuildId: typedChunk.PackerBuildId
        });
        stdErrRow.save().then(() => {
            callback();
        });
    }
}
