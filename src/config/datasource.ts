import { DataSource, DataSourceOptions } from 'typeorm';
import env from './env';

export const dbConfig: DataSourceOptions = {
  type: 'sqlite',
  database: env.DATABASE_URL,
  entities: ['src/db/entities/**/*.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: ['src/db/subscribers/**/*.ts'],
};

export default new DataSource(dbConfig);
