import { config as dotenvConfig } from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';

dotenvConfig({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const connectionOptions = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}']
} as DataSourceOptions;

export default new DataSource(connectionOptions);
