import express, { Application } from 'express';
import { initRouter } from './router';
import { errorMiddleware } from './middlewares/error.middleware';

const addMiddlewares = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
export const initApp = async (): Promise<Application> => {
  const app: Application = express();
  const router = await initRouter();
  addMiddlewares(app);
  app.use('/', router);
  app.use(errorMiddleware);
  return app;
};
initApp();
