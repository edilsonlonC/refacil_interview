import { DataSource, QueryRunner } from 'typeorm';
import { RepositoryFactory, UnitOfWork } from '../../../domain/ports/unit-of-work/unit.of.work';
import { TransactionRepository } from '../../../domain/ports/repositories/transaction.repository';
import { TransactionMapper } from '../../mappers/transaction/transaction.mapper';
import { UserMapper } from '../../mappers/user/user.mapper';
import { TransactionRepositoryImpl } from '../../adapters/repisotories-impl/transaction.repository.impl';
import { UserRepository } from '../../../domain/ports/repositories/user.repository';
import { UserRepositoryImpl } from '../../adapters/repisotories-impl/user.repository.impl';
import { createLogger } from '../../logger';

export class TypeOrmRepositoryFactory implements RepositoryFactory {
  constructor(
    private readonly datasource: DataSource,
    private readonly transactionMapper: TransactionMapper,
    private readonly userMapper: UserMapper,
  ) {}
  getUserRepository<EntityManager>(manager: EntityManager): UserRepository {
    //eslint-disable-next-line  @typescript-eslint/no-explicit-any
    return new UserRepositoryImpl(this.datasource, this.userMapper, manager as any);
  }
  getTransactionRepository<EntityManager>(manager: EntityManager): TransactionRepository {
    //eslint-disable-next-line  @typescript-eslint/no-explicit-any
    return new TransactionRepositoryImpl(this.datasource, this.transactionMapper, manager as any);
  }
}

export class TypeOrmUnitOfWork implements UnitOfWork {
  public queryRunner: QueryRunner;
  constructor(
    private readonly datasource: DataSource,
    private readonly transactionMapper: TransactionMapper,
    private readonly userMapper: UserMapper,
  ) {}
  async execute<T>(work: (respos: RepositoryFactory) => Promise<T>): Promise<T> {
    const factory: RepositoryFactory = new TypeOrmRepositoryFactory(
      this.datasource,
      this.transactionMapper,
      this.userMapper,
    );
    return work(factory); // for execute transactions
  }
  async commit(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }
  async startTransaction(): Promise<void> {
    this.queryRunner = this.datasource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }
  async rollback(): Promise<void> {
    if (this.queryRunner.isReleased) {
      createLogger().error('query runner is released');
      return;
    }
    if (this.queryRunner.isTransactionActive) {
      createLogger().error('query runner is active');
      await this.queryRunner.rollbackTransaction();
    }
  }
  async release(): Promise<void> {
    await this.queryRunner.release();
  }
  getManager() {
    return this.queryRunner?.manager;
  }
}
