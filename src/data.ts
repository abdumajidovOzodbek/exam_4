import { DataSource } from "typeorm"
import { Restarants } from "./entity/Restaurant.entity"
import { Food } from "./entity/Food.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "1234ozod",
    database: "graph",
    synchronize: false,
    logging: false,
    entities: [Restarants,Food]
})
