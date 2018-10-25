import { BucketItem } from "minio";
import { Writable } from "stream";

export class MinioArrayWriteStream extends Writable {

    public ReturnArray: BucketItem[];

    constructor() {
        super({ objectMode: true});
        this.ReturnArray = [];
    }

    public _write(chunk: any, encoding: string, callback: (err?: Error) => void) {
        this.ReturnArray.push(chunk);
        callback();
    }
}
