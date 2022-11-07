import { injectable } from 'inversify';
import { Product } from '../../db/entities/product.entity';
import { ProductsRepositoryService } from './products.repository';

@injectable()
export class ProductsService {
  constructor(
    private readonly productsRepositoryService: ProductsRepositoryService
  ) {}

  async findAll() {
    const products = await this.productsRepositoryService.findAll();

    return products;
  }

  async findById(id: Product['id']) {
    const product = await this.productsRepositoryService.findById(id);

    if (!product) throw new Error('No product found with the given id');

    return product;
  }

  async createOne(payload: Product) {
    const product = await this.productsRepositoryService.createOne(payload);

    return product;
  }

  async updateById(id: Product['id'], payload: Partial<Product>) {
    await this.findById(id);

    const updatedProduct = await this.productsRepositoryService.updateById(
      id,
      payload
    );

    return updatedProduct;
  }

  async deleteById(id: Product['id']) {
    await this.findById(id);

    return id;
  }
}
