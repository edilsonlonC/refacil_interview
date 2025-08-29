import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransaction1756437027549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "transaction_type_enum" AS ENUM('DEPOSIT', 'WITHDRAW')`);
    await queryRunner.query(`CREATE TABLE "transactions" (
    "transaction_id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
    "user_id" uuid NOT NULL, "amount" float NOT NULL, 
    "type" transaction_type_enum NOT NULL, 
    "timestamp" timestamp DEFAULT NOW(),
    CONSTRAINT "PK_transactions" PRIMARY KEY ("transaction_id"),
    CONSTRAINT "FK_trasaction_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "transaction_type_enum"`);
  }
}
