import * as path from "path";
import { Sequelize } from "sequelize-typescript";

export function sequelize(connectionString: string) {
    return new Sequelize({
        url: connectionString,
        modelPaths: [path.join(__dirname,  "models")]
    });
}
