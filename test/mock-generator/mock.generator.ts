import { DataSource, ObjectLiteral, Repository } from "typeorm"
import { initDataSource } from "../../src/infrastructure/database";

export const mockGenerator = async <T extends ObjectLiteral>(data: T): Promise<T> => {
  const dataSource: DataSource = await initDataSource()
  const repository: Repository<T> = dataSource.getRepository(data.constructor);
  return repository.save(data);

}
export const clearMock = async <T extends ObjectLiteral>(name: string): Promise<void> => {
  const dataSource: DataSource = await initDataSource();
  const repository: Repository<T> = dataSource.getRepository(name);
  return repository.query(`TRUNCATE TABLE ${repository.metadata.tableName} CASCADE`);
}



