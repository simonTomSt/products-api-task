import express from 'express';
import { Container, type interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import {
  ProductsService,
  ProductsController as _,
  ProductsRepositoryService,
} from '@modules/products';
import env from '@config/env';
import { DatabaseService } from '@services/database';

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
    });

    server.setErrorConfig(() => {});

    const app = server.build();

    app.listen(env.PORT, () =>
      console.log(`node server is listening on port ${env.PORT}`)
    );
  }
}
