import { Server } from 'http';
import { createLogger } from '../logger';
import { initApp } from './app';

const port = process.env.PORT || 3001;

let server: Server;

export const httpServer = async () => {
  const logger = createLogger();
  const app = await initApp();
  server = app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
  process.on('uncaughtException', (err: unknown) => {
    logger.error(err);
    if (server) {
      server.close(() => {
        logger.error('Server closed');
      });
    }
    process.exit(1);
  });
};
