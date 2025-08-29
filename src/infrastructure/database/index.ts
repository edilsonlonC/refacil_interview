import { DataSource } from 'typeorm';
import AppDataSource from './datasource';
let datasource: DataSource;
export const initDataSource = async (): Promise<DataSource> => {
  if (datasource) return datasource;
  datasource = await AppDataSource.initialize();
  return datasource;
};
