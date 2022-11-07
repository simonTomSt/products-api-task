import { injectable } from 'inversify';
import { DataSource } from 'typeorm';
import dataSource from '@config/datasource';
import { Product } from '@db/entities';

@injectable()
export class DatabaseService {
  private db: DataSource;
  public getRepository: any;

  async connect() {
    this.db = dataSource;

    await this.db.initialize();

    console.log('connected to db');
  }

  getProductsRepository() {
    return this.db.getRepository(Product);
  }
}
