export const transactionIsTooClose = (timestamp: Date): boolean => {
  const minimumTime = Number(process.env.MINIMUM_TIME || 10000);
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  return diff < minimumTime;
};
