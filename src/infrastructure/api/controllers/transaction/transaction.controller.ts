import { NextFunction, Request, Response } from 'express';
import { TransactionMapper } from '../../../mappers/transaction/transaction.mapper';
import { transactionValidator } from '../../validators/transaction/transaction.validator';
import { createLogger } from '../../../logger';
import { badRequest } from '../../errors';
import { TransactionCreateDto } from '../../../DTOs/transaction/transaction.create.dto';
import { TransactionResponseDto } from '../../../DTOs/transaction/transaction.response.dto';
import { StatusCodes } from 'http-status-codes';
import { UserTransactionUseCase } from '../../../../application/use-cases/user.transaction.usecase';
import { TransactionModel } from '../../../../domain/models/transaction.model';

export class TransactionController {
  private readonly logger = createLogger();
  constructor(
    private readonly userTransactionUseCase: UserTransactionUseCase,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  createTransaction = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      const validation = transactionValidator.validate(body);
      if (validation.error) {
        this.logger.error(validation.error.message);
        throw badRequest(validation.error.message);
      }
      const transactionDto: TransactionCreateDto = new TransactionCreateDto(body.userId, body.amount, body.type);
      const transaction: TransactionModel | undefined = await this.userTransactionUseCase.createTransaction(
        this.transactionMapper.createDtoToModel(transactionDto),
      );
      const transactionResponse: TransactionResponseDto = this.transactionMapper.modelToResponseDto(transaction!);
      return response.status(StatusCodes.CREATED).json({
        transaction: transactionResponse,
      });
    } catch (e: unknown) {
      next(e);
    }
  };
}
