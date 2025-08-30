import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'transaction_id',
  })
  transactionId: string;
  @Column({
    name: 'user_id',
  })
  userId: string;
  @Column()
  amount: number;
  @Column()
  type: TransactionType;
  @CreateDateColumn({
    name: 'timestamp',
    default: () => 'NOW()',
  })
  timestamp: Date;
}
