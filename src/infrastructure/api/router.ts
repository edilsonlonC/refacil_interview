import express, { Router } from 'express';
import { HealthController } from './controllers/health/health.controller';
import { DataSource } from 'typeorm';
import { initDataSource } from '../database';
import { UserRepository } from '../../domain/ports/repositories/user.repository';
import { UserRepositoryImpl } from '../adapters/repisotories-impl/user.repository.impl';
import { UserMapper } from '../mappers/user/user.mapper';
import { UserUseCase } from '../../application/use-cases/user.usecase';
import { UserController } from './controllers/user/user.controller';
import { BcryptHasher } from '../adapters/hasher/bcrypt.hasher';
import { Hasher } from '../../domain/ports/hasher/hasher';
import { TransactionMapper } from '../mappers/transaction/transaction.mapper';
import { UserTransactionUseCase } from '../../application/use-cases/user.transaction.usecase';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { RepositoryFactory, UnitOfWork } from '../../domain/ports/unit-of-work/unit.of.work';
import { TypeOrmRepositoryFactory, TypeOrmUnitOfWork } from '../database/unit-of-work/typeorm.unit.of.work';
import { TransactionRepositoryImpl } from '../adapters/repisotories-impl/transaction.repository.impl';
import { TransactionRepository } from '../../domain/ports/repositories/transaction.repository';
import { TransactionUseCase } from '../../application/use-cases/transaction.usecase';

export const initRouter = async (): Promise<Router> => {
  // Database
  const dataSource: DataSource = await initDataSource();

  // Mappers
  const userMapper: UserMapper = new UserMapper();
  const transactionMapper: TransactionMapper = new TransactionMapper();
  // Repositories
  const userRepository: UserRepository = new UserRepositoryImpl(dataSource, userMapper);
  const transactionRepository: TransactionRepository = new TransactionRepositoryImpl(dataSource, transactionMapper);
  // Hasher
  const hasher: Hasher = new BcryptHasher();
  // unit-of-work
  const unitOfWork: UnitOfWork = new TypeOrmUnitOfWork(dataSource, transactionMapper, userMapper);
  const repositoryFactory: RepositoryFactory = new TypeOrmRepositoryFactory(dataSource, transactionMapper, userMapper);
  // use-cases
  const userUseCase: UserUseCase = new UserUseCase(userRepository, hasher);
  const userTransactionUseCase: UserTransactionUseCase = new UserTransactionUseCase(unitOfWork, repositoryFactory);
  const transactionUseCase: TransactionUseCase = new TransactionUseCase(transactionRepository);

  // Controllers
  const healthController = new HealthController();
  const userController: UserController = new UserController(userUseCase, userMapper);
  const transactionController: TransactionController = new TransactionController(
    userTransactionUseCase,
    transactionUseCase,
    transactionMapper,
  );
  const router = express.Router();
  router.get('/health', healthController.getHealth);
  router.post('/user', userController.createUser);
  router.get('/user/:id', userController.getUserById);
  router.post('/transaction', transactionController.createTransaction);
  router.get('/transaction/:userId', transactionController.getTransactionsByUserId);
  return router;
};
