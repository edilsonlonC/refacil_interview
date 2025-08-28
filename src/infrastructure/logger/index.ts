import pino, { Logger } from 'pino';
let logger: Logger;
export const createLogger = () => {
  if (logger) return logger;
  logger = pino();
  return logger;
};
