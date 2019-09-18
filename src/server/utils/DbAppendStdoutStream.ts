import { Writable } from "stream";
import { IBuildOutputLine } from "../../common/models/IBuildOutputLine";
import Artifact from "../data/models/Artifact";
import PackerBuildStdout from "../data/models/PackerBuildStdout";
import { Dependencies } from "../dependencyManager";

export class DbAppendStdoutStream extends Writable {

    constructor() {
        super({ objectMode: true});
    }

    public async _write(chunk: any, encoding: string, callback: (err?: Error) => void) {
        const typedChunk: IBuildOutputLine = chunk as IBuildOutputLine;
        const stdOutRow = PackerBuildStdout.build({
            DateTimeStamp: typedChunk.DateTimeStamp,
            Text: typedChunk.Text,
            PackerBuildId: typedChunk.PackerBuildId
        });
        const artifact = this.parsePackerOutputLine(typedChunk.Text);
        if (artifact) {
            const resourceId = await Dependencies().VCenter.GetVMIdByName(artifact);
            await Artifact.upsert({
                PackerBuildId: typedChunk.PackerBuildId,
                Name: artifact,
                Type: "VirtualMachine",
                RegisterTime: new Date(),
                ResourceId: resourceId
            });
        }
        stdOutRow.save().then(() => {
            callback();
        });
    }

    private parsePackerOutputLine = (line: string): string => {
        const csvSplit = line.split(",");
        if (parseInt(csvSplit[0], 10) > 0) {
            if (csvSplit.length === 6) {
                if (csvSplit[2] === "artifact" && csvSplit[4] === "id") {
                    return csvSplit[5];
                }
            }
        }
        return null;
    }
}
