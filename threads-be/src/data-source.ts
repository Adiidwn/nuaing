import "reflect-metadata"
import { DataSource } from "typeorm"
import { Thread } from "./entity/Thread"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "test",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
