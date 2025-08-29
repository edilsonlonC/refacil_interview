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
import { TransactionRepository } from '../../domain/ports/repositories/transaction.repository';
import { TransactionRepositoryImpl } from '../adapters/repisotories-impl/transaction.repository.impl';
import { TransactionUseCase } from '../../application/use-cases/transaction.usecase';
import { UserTransactionUseCase } from '../../application/use-cases/user.transaction.usecase';
import { TransactionController } from './controllers/transaction/transaction.controller';

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
  // use-cases
  const userUseCase: UserUseCase = new UserUseCase(userRepository, hasher);
  const transactionUseCase: TransactionUseCase = new TransactionUseCase(transactionRepository);
  const userTransactionUseCase: UserTransactionUseCase = new UserTransactionUseCase(userUseCase, transactionUseCase);

  // Controllers
  const healthController = new HealthController();
  const userController: UserController = new UserController(userUseCase, userMapper);
  const transactionController: TransactionController = new TransactionController(
    userTransactionUseCase,
    transactionMapper,
  );
  const router = express.Router();
  router.get('/health', healthController.getHealth);
  router.post('/user', userController.createUser);
  router.post('/transaction', transactionController.createTransaction);
  return router;
};
