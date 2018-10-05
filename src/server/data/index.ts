import * as path from "path";
import { Sequelize } from "sequelize-typescript";

export function sequelize(username: string, password: string, database: string, host: string, port: number) {
    return new Sequelize({
        dialect: "postgres",
        operatorsAliases: Sequelize.Op as any,
        database,
        host,
        username,
        password,
        port,
        modelPaths: [path.join(__dirname,  "models")]
    });
}
