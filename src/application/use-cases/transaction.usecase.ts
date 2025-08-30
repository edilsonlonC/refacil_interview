import { TransactionModel } from '../../domain/models/transaction.model';
import { TransactionRepository } from '../../domain/ports/repositories/transaction.repository';

export class TransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async createTransaction(transaction: TransactionModel): Promise<TransactionModel> {
    return this.transactionRepository.createTransaction(transaction);
  }
  async getTransactionsByUserId(userId: string): Promise<TransactionModel[]> {
    return this.transactionRepository.getTransactionsByUserId(userId);
  }
}
