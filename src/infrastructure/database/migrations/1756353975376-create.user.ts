import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1756353975376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await queryRunner.query(`CREATE TABLE "users" (
    "id" uuid DEFAULT gen_random_uuid(),
    "name" character varying NOT NULL, 
    "email" character varying NOT NULL, 
    "password" character varying NOT NULL, 
    "balance" float DEFAULT 0,
    CONSTRAINT "PK_users" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
