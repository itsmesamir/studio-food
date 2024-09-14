import { Knex } from 'knex';

import config from './config';

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
    min: +(process.env.DB_POOL_MIN || '1'),
    max: +(process.env.DB_POOL_MAX || '4'),
  },
};

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    tableName: 'migrations_auth',
    directory: 'database/migrations',
    stub: 'stub/migration.stub',
  },
  seeds: {
    directory: 'database/seeds',
    stub: 'stub/seed.stub',
  },
};

export default knexConfig;
