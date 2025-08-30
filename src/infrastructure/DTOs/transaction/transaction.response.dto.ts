import { TransactionType } from './enum.transaction.type';

export class TransactionResponseDto {
  constructor(
    private transactionId: string,
    private userId: string,
    private amount: number,
    private type: TransactionType,
    private timestamp: Date,
  ) {}
  getTransactionId(): string {
    return this.transactionId;
  }
  getUserId() {
    return this.userId;
  }
  getAmount() {
    return this.amount;
  }
  getType() {
    return this.type;
  }
  getTimestamp(): Date {
    return this.timestamp;
  }
}
