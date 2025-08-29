export class UserCreateDto {
  constructor(
    private name: string,
    private email: string,
    private password: string,
  ) {}
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
}
