import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { Container, type interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import env from '@config/env';
import {
  ProductsService,
  ProductsController as _,
  ProductsRepositoryService,
} from '@modules/products';
import { DatabaseService } from '@services/database';
import { catchErrorMiddleware } from '@middleware/catch-error';

export class Application {
  private readonly container: Container;

  constructor(options: interfaces.ContainerOptions) {
    this.container = new Container(options);
  }

  configureServices() {
    this.container.bind(DatabaseService).toSelf();
    this.container.bind(ProductsRepositoryService).toSelf();
    this.container.bind(ProductsService).toSelf();
  }

  async setup() {
    const db = this.container.get(DatabaseService);
    await db.connect();

    const server = new InversifyExpressServer(this.container);

    server.setConfig((app) => {
      app.use(express.json());
      app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(require('src/docs/openapi.json'))
      );
      app.use(morgan('dev'));
    });

    server.setErrorConfig((app) => app.use(catchErrorMiddleware));

    const app = server.build();

    app.listen(env.PORT, () =>
      console.log(`node server is listening on port ${env.PORT}`)
    );
  }
}
