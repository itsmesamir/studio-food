import { Knex } from "knex";

import config from "./config";

const { database: dbConfig } = config;

export const baseKnexConfig = {
  client: dbConfig.client,
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
  },
  pool: {
    min: +(process.env.DB_POOL_MIN || "1"),
    max: +(process.env.DB_POOL_MAX || "4"),
  },
};

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    tableName: "migrations_studio_food",
    directory: "database/migrations",
  },
  seeds: {
    directory: "database/seeds",
  },
};

export default knexConfig;
