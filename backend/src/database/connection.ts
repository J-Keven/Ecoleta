import knex from "knex";
import { resolve } from "path";

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: resolve(__dirname, "src", "database", "./db.sqlite3"),
  },
  migrations: {
    directory: resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
});

export default connection;
