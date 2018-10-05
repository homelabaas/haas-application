import * as ssh from "ssh-exec";

export interface ISSHReturn {
    stdout: string;
    stderr: string;
}

export function SSHExec(username: string, password: string, host: string, command: string): Promise<ISSHReturn> {
    return new Promise<ISSHReturn>((resolve, reject) => {
        ssh(command, {
            host,
            password,
            user: username,
        }, (err, stdout, stderr) => {
            if (err) {
                reject({ err, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}
