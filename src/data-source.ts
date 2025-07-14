import { config as dotenvConfig } from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

dotenvConfig({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const options = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/database/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  seeds: [__dirname + '/database/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/database/factories/**/*{.ts,.js}']
} as DataSourceOptions & SeederOptions;

export const dataSource = new DataSource(options);
