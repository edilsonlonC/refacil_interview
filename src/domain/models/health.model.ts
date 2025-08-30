export class HealthModel {
  constructor(
    private status: string,
    private ok: boolean,
  ) {}
  getStatus() {
    return this.status;
  }
  getOk() {
    return this.ok;
  }
}
