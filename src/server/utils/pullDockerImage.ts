import * as http from "http";
import { IDockerAuth } from "./../dependencyManager";

export function PullImage(tag: string, socketPath: string, auth?: IDockerAuth) {
    return new Promise<any>((resolve, reject) => {
        let options = {}
        if (auth) {
            options = {
                socketPath,
                path: "/v1.37/images/create?fromImage=" + encodeURIComponent(tag) + "&tag=latest",
                method: "POST",
                headers: {
                    "X-Registry-Auth": Buffer.from(JSON.stringify(auth)).toString("base64")
                }
            };
        } else {
            options = {
                socketPath,
                path: "/v1.37/images/create?fromImage=" + encodeURIComponent(tag) + "&tag=latest",
                method: "POST"
            };
        }

        const clientRequest = http.request(options, (res) => {
            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk) => {
                rawData += chunk;
            });
            res.on("end", () => {
                resolve();
            });
        });
        clientRequest.on("error", (e) => {
            reject(e);
        });
        clientRequest.end();
    });
}
