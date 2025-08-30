export class EntityBalanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityBalanceError';
  }
}
