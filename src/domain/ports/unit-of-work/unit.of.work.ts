import { TransactionRepository } from '../repositories/transaction.repository';
import { UserRepository } from '../repositories/user.repository';

export interface UnitOfWork {
  execute<T>(work: (repos: RepositoryFactory) => Promise<T>): Promise<T>;
  commit(): Promise<void>;
  startTransaction(): Promise<void>;
  rollback(): Promise<void>;
  release(): Promise<void>;
  //eslint-disable-next-line  @typescript-eslint/no-explicit-any
  getManager(): any;
}

export interface RepositoryFactory {
  getTransactionRepository<T>(manager: T): TransactionRepository;
  getUserRepository<T>(manager: T): UserRepository;
}
