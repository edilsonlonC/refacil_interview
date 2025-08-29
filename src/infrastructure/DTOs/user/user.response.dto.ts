export class UserResponseDto {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private balance: number,
  ) {}
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getBalance() {
    return this.balance;
  }
}
