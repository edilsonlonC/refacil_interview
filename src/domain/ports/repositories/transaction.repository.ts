import { TransactionModel } from '../../models/transaction.model';

export interface TransactionRepository {
  getTransactionById(id: string): Promise<TransactionModel | null>;
  getTransactionsByUserId(userId: string): Promise<TransactionModel[]>;
  getLastTransactionByUserId(userId: string): Promise<TransactionModel | null>;
  createTransaction(transaction: TransactionModel): Promise<TransactionModel>;
}
