import { validateRequest } from '@middleware/validate-request.middleware';
import type { Request, Response } from 'express';
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  requestBody,
  requestParam,
  response,
} from 'inversify-express-utils';
import { Product } from 'src/db/entities';
import { ProductsService } from './products.service';
import {
  createProductValidator,
  updateProductValidator,
} from './products.validators';

@controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @httpGet('/')
  async getAll(_req: Request, res: Response) {
    const products = await this.productsService.findAll();

    res.json({
      data: {
        products,
      },
    });
  }

  @httpGet('/:id')
  async getOne(@requestParam('id') id: string, @response() res: Response) {
    const product = await this.productsService.findById(id);

    res.json({
      data: {
        product,
      },
    });
  }

  @httpPost('/', ...validateRequest(createProductValidator))
  async createOne(@requestBody() body: Product, @response() res: Response) {
    const product = await this.productsService.createOne(body);

    res.json({
      data: {
        product,
      },
    });
  }

  @httpPatch('/:id', ...validateRequest(updateProductValidator))
  async updateOne(
    @requestParam('id') id: string,
    @requestBody() body: Product,
    @response() res: Response
  ) {
    const product = await this.productsService.updateById(id, body);

    res.json({
      data: {
        product,
      },
    });
  }

  @httpDelete('/:id')
  async deleteOne(@requestParam('id') id: string, @response() res: Response) {
    const deletedId = await this.productsService.deleteById(id);

    res.json({
      data: {
        id: deletedId,
      },
    });
  }
}
