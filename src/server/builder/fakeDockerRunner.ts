
export type DockerRun = (
    image: string,
    cmd: string[],
    outputStream: NodeJS.WritableStream | NodeJS.WritableStream[],
    createOptions?: {},
    startOptions?: {}) => Promise<any>;

const stdoutText = "1532084842,vsphere-clone,artifact-count,1\n"
 + "1532084842,vsphere-clone,artifact,0,builder-id,jetbrains.vsphere\n"
 + "1532084842,vsphere-clone,artifact,0,id,ubuntu-1804-docker-5\n"
 + "1532084842,vsphere-clone,artifact,0,string,ubuntu-1804-docker-5\n"
 + "1532084842,vsphere-clone,artifact,0,files-count,0\n"
 + "1532084842,vsphere-clone,artifact,0,end";

export class FakeDocker {
    public run: DockerRun = (
        image: string,
        cmd: string[],
        outputStream: NodeJS.WritableStream | NodeJS.WritableStream[],
        createOptions?: {},
        startOptions?: {}): Promise<any>  => {

        return new Promise((resolve) => {
            if (outputStream instanceof Array) {
                const outputStreamArray: NodeJS.WritableStream[] = outputStream as NodeJS.WritableStream[];
                outputStreamArray[0].write(stdoutText, () => {
                    outputStreamArray[0].end(() => {
                        resolve({
                            output: {
                                StatusCode: 0
                            }
                        });
                    });
                });
            }
        });
    }
}
