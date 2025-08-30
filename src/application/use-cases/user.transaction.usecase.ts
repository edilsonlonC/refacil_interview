import { EntityBalanceError } from '../../domain/errors/entity.balance.error';
import { EntityNotFoundError } from '../../domain/errors/entity.not.found.error';
import { TransactionModel, TransactionType } from '../../domain/models/transaction.model';
import { UserModel } from '../../domain/models/user.model';
import { TransactionRepository } from '../../domain/ports/repositories/transaction.repository';
import { UserRepository } from '../../domain/ports/repositories/user.repository';
import { RepositoryFactory, UnitOfWork } from '../../domain/ports/unit-of-work/unit.of.work';
import { createLogger } from '../../infrastructure/logger';
import { transactionIsTooClose } from '../utils/utils';

export class UserTransactionUseCase {
  private readonly logger = createLogger();
  private readonly name = 'UserTransactionUseCase';
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly repositoryFactory: RepositoryFactory,
  ) {}

  async createTransaction(transactionModel: TransactionModel): Promise<TransactionModel | undefined> {
    try {
      await this.unitOfWork.startTransaction();
      const transactionRepository: TransactionRepository = this.repositoryFactory.getTransactionRepository(
        this.unitOfWork.getManager(),
      );
      const userRepository: UserRepository = this.repositoryFactory.getUserRepository(this.unitOfWork.getManager());
      const user: UserModel | null = await userRepository.getUserById(transactionModel.getUserId());
      const lastTransaction: TransactionModel | null = await transactionRepository.getLastTransactionByUserId(
        transactionModel.getUserId(),
      );
      if (lastTransaction) {
        if (transactionIsTooClose(lastTransaction.getTimestamp()!)) {
          this.logger.info({
            lastTransactionId: lastTransaction.getTransactionId(),
            userId: lastTransaction.getUserId(),
            message: 'Transaction is too close to the last one',
            name: this.name,
          });
        }
      }
      if (!user) throw new EntityNotFoundError('user.not.found');
      const transaction: TransactionModel = await transactionRepository.createTransaction(transactionModel);
      let newBalance = 0;
      if (transaction.getType() === TransactionType.WITHDRAW) {
        if (user.getBalance()! < transaction.getAmount()) {
          throw new EntityBalanceError('user.balance.less.than.amount');
        }
        newBalance = user.getBalance()! - transaction.getAmount();
      }
      if (transaction.getType() === TransactionType.DEPOSIT) {
        newBalance = user.getBalance()! + transaction.getAmount();
      }
      await userRepository.updateBalance(transactionModel.getUserId(), newBalance);
      await this.unitOfWork.commit();
      this.logger.info({
        transactionId: transaction.getTransactionId(),
        userId: transaction.getUserId(),
        type: transaction.getType(),
        message: 'Transaction created',
        name: this.name,
      });
      return transaction;
    } catch (e: unknown) {
      await this.unitOfWork.rollback();
      this.logger.error(e);
      throw e;
    } finally {
      await this.unitOfWork.release();
    }
  }
}
