import { Application } from "express"
import { initApp } from "../../../../../../src/infrastructure/api/app";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { UserEntity } from "../../../../../../src/infrastructure/database/entities/user.entity";
import { clearMock } from "../../../../../mock-generator/mock.generator";
import { TransactionCreateDto } from "../../../../../../src/infrastructure/DTOs/transaction/transaction.create.dto";
import { TransactionType } from "../../../../../../src/infrastructure/DTOs/transaction/enum.transaction.type";
import { userMockGenerator } from "../../../../../mock-generator/user.mock.generator";
import { initDataSource } from "../../../../../../src/infrastructure/database";
import { DataSource, Repository } from "typeorm";
import { TransactionEntity } from "../../../../../../src/infrastructure/database/entities/transaction.entity";
import { faker } from "@faker-js/faker";


describe('#Transaction controller', () => {
  let app: Application;
  let request: TestAgent;
  const url: string = '/transaction';
  let dataSource: DataSource;
  let userRepository: Repository<UserEntity>;
  let transactionRepository: Repository<TransactionEntity>;
  beforeAll(async () => {
    app = await initApp()
    request = supertest(app);
    dataSource = await initDataSource();
    userRepository = dataSource.getRepository(UserEntity);
    transactionRepository = dataSource.getRepository(TransactionEntity);
  });
  beforeEach(async () => {
    clearMock(UserEntity.name);
    clearMock(TransactionEntity.name);
  })
  it('should return 201 when create transaction of type deposit and add user balance', async () => {
    const userEntity: UserEntity = await userMockGenerator();
    const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto(userEntity.id, 100, TransactionType.DEPOSIT);
    const response = await request.post(url).send(transactionCreateDto);
    expect(response.status).toBe(201);
    const transaction = response.body.transaction;
    expect(transaction.userId).toBe(userEntity.id);
    expect(transaction.amount).toBe(100);
    expect(transaction.type).toBe(TransactionType.DEPOSIT);
    expect(transaction.timestamp).toBeDefined();
    expect(transaction.transactionId).toBeDefined();
    const user: UserEntity | null = await userRepository.findOne({
      where: { id: userEntity.id },
    });
    const transactionEntity: TransactionEntity | null = await transactionRepository.findOne({
      where: { userId: userEntity.id },
    });

    expect(user?.balance).toBe(userEntity.balance + 100);
    expect(transactionEntity).toBeDefined();
    expect(transactionEntity?.amount).toBe(100);

  });
  it('should return 201 when create transaction of type withdraw and substract user balance', async () => {
    const userEntity: UserEntity = await userMockGenerator();
    const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto(userEntity.id, 100, TransactionType.WITHDRAW);
    const response = await request.post(url).send(transactionCreateDto);
    expect(response.status).toBe(201);
    const transaction = response.body.transaction;
    expect(transaction.userId).toBe(userEntity.id);
    expect(transaction.amount).toBe(100);
    expect(transaction.type).toBe(TransactionType.WITHDRAW);
    expect(transaction.timestamp).toBeDefined();
    expect(transaction.transactionId).toBeDefined();
    const user: UserEntity | null = await userRepository.findOne({
      where: { id: userEntity.id },
    });
    const transactionEntity: TransactionEntity | null = await transactionRepository.findOne({
      where: { userId: userEntity.id },
    });
    expect(user?.balance).toBe(userEntity.balance - 100);
    expect(transactionEntity?.amount).toBe(100);
    expect(transactionEntity).toBeDefined();
  });

  it('should return 400 when create transaction and user not found', async () => {
    const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto('e2eee323-cffb-4e42-bb5c-22adda7b0214', 100, TransactionType.DEPOSIT);
    const response = await request.post(url).send(transactionCreateDto);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('user.not.found');
    expect(response.body.statusCode).toBe(400);
    expect(response.body.statusMessage).toBe('Bad Request');
  });
  it('should return 400 when create transaction and amount is not valid', async () => {
    const userEntity: UserEntity = await userMockGenerator();
    const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto(userEntity.id, 0, TransactionType.DEPOSIT);
    const response = await request.post(url).send(transactionCreateDto);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('amount.must.be.greater.than.zero');
    expect(response.body.statusCode).toBe(400);
    expect(response.body.statusMessage).toBe('Bad Request');
  });
  it('should do rollback with error in balance', async () => {
    const userEntity: UserEntity = await userMockGenerator();
    const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto(userEntity.id, userEntity.balance + 100, TransactionType.WITHDRAW);
    const response = await request.post(url).send(transactionCreateDto);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('user.balance.less.than.amount');
    expect(response.body.statusCode).toBe(400);
    expect(response.body.statusMessage).toBe('Bad Request');
    const user: UserEntity | null = await userRepository.findOne({
      where: { id: userEntity.id },
    });
    const transactionEntity: TransactionEntity | null = await transactionRepository.findOne({
      where: { userId: userEntity.id },
    });
    expect(user?.balance).toBe(userEntity.balance);
    expect(transactionEntity).toBeNull();

  })
  it('should return 400 when type is not valid', async () => {
    const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto('4ea7a97f-59c2-44d4-90fe-5417f025360f', 100, 'INVALID' as any);
    const response = await request.post(url).send(transactionCreateDto);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('type.must.be.a.valid.transaction.type');
    expect(response.body.statusCode).toBe(400);
    expect(response.body.statusMessage).toBe('Bad Request');
  });
  it('should return 400 when userId is not uuid', async () => {
    const transactionCreateDto: TransactionCreateDto = new TransactionCreateDto('INVALID' as any, 100, TransactionType.DEPOSIT);
    const response = await request.post(url).send(transactionCreateDto);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('userId.must.be.a.valid.uuid');
    expect(response.body.statusCode).toBe(400);
    expect(response.body.statusMessage).toBe('Bad Request');
  });
});
