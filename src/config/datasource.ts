import { DataSource, DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'src/db/db',
  entities: ['src/db/entities/**/*.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: ['src/db/subscribers/**/*.ts'],
};

export default new DataSource(dbConfig);
