import { DataSource } from 'typeorm';
import { initDataSource } from './src/infrastructure/database';
const logger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn(),
  fatal: jest.fn(),
};


jest.mock('./src/infrastructure/logger', () => {
  return {
    logger,
    createLogger: jest.fn().mockReturnValue(logger)
  }
});


beforeAll(async () => {
  try {
    const dataSource: DataSource = await initDataSource();
    await dataSource.runMigrations();
  } catch (error) {
    console.log(error);
  }
});
afterAll(async () => {
  const dataSource: DataSource = await initDataSource();
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE ${entity.tableName} CASCADE`);
  }
  jest.clearAllMocks();
  dataSource.destroy();


});
