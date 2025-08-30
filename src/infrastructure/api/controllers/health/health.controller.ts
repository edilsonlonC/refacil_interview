import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { HealthModel } from '../../../../domain/models/health.model';
import { createLogger } from '../../../logger';

export class HealthController {
  private readonly logger = createLogger();
  getHealth = (_: Request, response: Response) => {
    const healthModel = new HealthModel('OK', true);
    this.logger.info(process.env.HOSTNAME);
    return response.status(StatusCodes.OK).json(healthModel);
  };
}
