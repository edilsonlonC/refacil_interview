import { TransactionEntity, TransactionType } from "../../src/infrastructure/database/entities/transaction.entity";
import { mockGenerator } from "./mock.generator";

export const transactionMockGenerator = async (userId: string): Promise<TransactionEntity> => {
  const transactionEntity: TransactionEntity = new TransactionEntity();
  transactionEntity.userId = userId;
  transactionEntity.amount = 100;
  transactionEntity.type = 'DEPOSIT' as TransactionType;
  return mockGenerator<TransactionEntity>(transactionEntity);

}
