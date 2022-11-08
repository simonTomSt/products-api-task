import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { DatabaseService } from '@services/database';
import { Product } from '@db/entities/product.entity';

@injectable()
export class ProductsRepositoryService {
  private readonly productsRepository: Repository<Product>;

  constructor(private readonly dbService: DatabaseService) {
    this.productsRepository = this.dbService.getProductsRepository();
  }

  async findAll() {
    return this.productsRepository.find({});
  }

  async findById(id: Product['id']) {
    return this.productsRepository.findOneBy({ id });
  }

  async createOne(payload: Product) {
    return this.productsRepository.save(payload);
  }

  async updateById(id: Product['id'], payload: Partial<Product>) {
    await this.productsRepository.update(id, payload);
    return this.productsRepository.findOneBy({ id });
  }

  async deleteById(id: Product['id']) {
    return this.productsRepository.delete({ id });
  }
}
