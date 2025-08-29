import { DataSource, Repository } from 'typeorm';
import { TransactionModel } from '../../../domain/models/transaction.model';
import { TransactionRepository } from '../../../domain/ports/repositories/transaction.repository';
import { TransactionEntity } from '../../database/entities/transaction.entity';
import { TransactionMapper } from '../../mappers/transaction/transaction.mapper';

export class TransactionRepositoryImpl implements TransactionRepository {
  private transactionRepository: Repository<TransactionEntity>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly transactionMapper: TransactionMapper,
  ) {
    this.transactionRepository = this.dataSource.getRepository(TransactionEntity);
  }
  async getTransactionById(id: string): Promise<TransactionModel | null> {
    const transactionEntity: TransactionEntity | null = await this.transactionRepository.findOne({
      where: { transactionId: id },
    });
    return transactionEntity ? this.transactionMapper.entityToModel(transactionEntity) : null;
  }

  async createTransaction(transaction: TransactionModel): Promise<TransactionModel> {
    return this.transactionMapper.entityToModel(
      await this.transactionRepository.save(this.transactionMapper.modelToEntity(transaction)),
    );
  }
}
