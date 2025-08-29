import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export interface HttpError {
  message: string;
  statusCode: number;
  statusMessage?: string;
}

export const badRequest = (message: string): HttpError => ({
  message,
  statusCode: StatusCodes.BAD_REQUEST,
  statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
});
export const internalServerError = (message: string): HttpError => ({
  message,
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
});
