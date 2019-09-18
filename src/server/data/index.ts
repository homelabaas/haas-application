import * as bunyan from "bunyan";
import * as seq from "bunyan-seq";
import * as config from "config";
import * as path from "path";
import { Sequelize } from "sequelize-typescript";

export function sequelize(connectionString: string, logfilePath: string) {
    const sqlLogger = bunyan.createLogger({
        name: "sql",
        streams: [
            {
                level: "info",
                path: path.join(logfilePath, "sql.log")
            },
            seq.createStream({serverUrl: config.get("Logfiles.SeqUrl")})
        ]
    });
    return new Sequelize(
        connectionString,
        {
            modelPaths: [path.join(__dirname,  "models")],
            logging: (str) => {
                sqlLogger.info(str);
            }
        });
}
