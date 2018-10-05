import { BucketItem } from "minio";
import * as path from "path";
import { Writable } from "stream";

export class MinioArrayWriteStream extends Writable {

    public ReturnArray: BucketItem[];
    private filename: string;

    constructor(filename: string) {
        super({ objectMode: true});
        this.ReturnArray = [];
        this.filename = filename;
    }

    public _write(chunk: any, encoding: string, callback: (err?: Error) => void) {
        const name = chunk.name as string;
        if (path.basename(name) === this.filename) {
            this.ReturnArray.push(chunk);
        }
        callback();
    }
}
