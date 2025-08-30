export class EntityExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityExistError';
  }
}
