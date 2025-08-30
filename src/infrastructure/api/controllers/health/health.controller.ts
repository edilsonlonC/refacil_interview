import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { HealthModel } from '../../../../domain/models/health.model';

export class HealthController {
  getHealth(_: Request, response: Response) {
    const healthModel = new HealthModel('OK', true);
    return response.status(StatusCodes.OK).json(healthModel);
  }
}
