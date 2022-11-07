import 'reflect-metadata';
import { Application } from '@services/application';

const bootstrap = async () => {
  const app = new Application({
    defaultScope: 'Singleton',
  });

  app.configureServices();
  await app.setup();
};

bootstrap();
