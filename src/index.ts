import { httpServer } from './infrastructure/api/server';

const initApplication = async () => {
  await httpServer();
};
initApplication();
