import express, { Application } from 'express';
import { createLogger } from './infrastructure/logger';

export const initApp = async () => {
  const app: Application = express();
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
  app.listen(3001, () => {
    const logger = createLogger();
    logger.info('Server started');
  });
};
initApp();
