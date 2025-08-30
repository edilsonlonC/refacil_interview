export class UserModel {
  constructor(
    private name: string,
    private email: string,
    private id?: string,
    private balance?: number,
    private password?: string,
  ) {}
  getId(): string | undefined {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getBalance(): number | undefined {
    return this.balance;
  }
  getPassword(): string | undefined {
    return this.password;
  }
  setPassword(password: string): void {
    this.password = password;
  }
}
