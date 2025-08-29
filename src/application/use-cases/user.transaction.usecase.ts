import { EntityNotFoundError } from '../../domain/errors/entity.not.found.error';
import { TransactionModel } from '../../domain/models/transaction.model';
import { UserModel } from '../../domain/models/user.model';
import { createLogger } from '../../infrastructure/logger';
import { TransactionUseCase } from './transaction.usecase';
import { UserUseCase } from './user.usecase';

export class UserTransactionUseCase {
  private readonly logger = createLogger();
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly transactionUseCase: TransactionUseCase,
  ) {}

  async createTransaction(transactionModel: TransactionModel): Promise<TransactionModel> {
    const userExist: UserModel | null = await this.userUseCase.findById(transactionModel.getUserId());
    if (!userExist) {
      this.logger.error(`user does not exist with id ${transactionModel.getUserId()}`);
      throw new EntityNotFoundError('user.does.not.exist');
    }
    return this.transactionUseCase.createTransaction(transactionModel);
  }
}
