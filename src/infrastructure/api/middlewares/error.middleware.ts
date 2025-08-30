import { NextFunction, Request, Response } from 'express';
import { badRequest, HttpError, internalServerError } from '../errors';
import { createLogger } from '../../logger';
import { EntityExistError } from '../../../domain/errors/entity.exist.error';
import { EntityNotFoundError } from '../../../domain/errors/entity.not.found.error';
import { EntityBalanceError } from '../../../domain/errors/entity.balance.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: HttpError | Error, _: Request, res: Response, __: NextFunction) => {
  const logger = createLogger();
  logger.error(err);
  if (err instanceof EntityExistError || err instanceof EntityNotFoundError || err instanceof EntityBalanceError) {
    const badRequestError = badRequest(err.message);
    return res.status(badRequestError.statusCode).json(badRequestError);
  }
  if (err instanceof Error) {
    const internalError = internalServerError('Internal server error');
    return res.status(internalError.statusCode).json(internalError);
  }
  return res.status(err.statusCode).json({
    message: err.message,
    statusCode: err.statusCode,
    statusMessage: err.statusMessage,
  });
};
