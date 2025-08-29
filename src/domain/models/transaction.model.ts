export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}
export class TransactionModel {
  constructor(
    private userId: string,
    private amount: number,
    private transactionId?: string,
    private type?: TransactionType,
    private timestamp?: Date,
  ) {}
  getTransactionId(): string | undefined {
    return this.transactionId;
  }
  getUserId(): string {
    return this.userId;
  }
  getAmount(): number {
    return this.amount;
  }
  getType() {
    return this.type;
  }
  getTimestamp() {
    return this.timestamp;
  }
}
