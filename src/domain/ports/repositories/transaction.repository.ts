import { TransactionModel } from '../../models/transaction.model';

export interface TransactionRepository {
  getTransactionById(id: string): Promise<TransactionModel | null>;
  getTransactionsByUserId(userId: string): Promise<TransactionModel[]>;
  createTransaction(transaction: TransactionModel): Promise<TransactionModel>;
}
