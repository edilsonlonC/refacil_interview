import { TransactionType } from './enum.transaction.type';

export class TransactionCreateDto {
  constructor(
    private userId: string,
    private amount: number,
    private type: TransactionType,
  ) {}
  getUserId(): string {
    return this.userId;
  }
  getAmount(): number {
    return this.amount;
  }
  getType(): TransactionType {
    return this.type;
  }
}
