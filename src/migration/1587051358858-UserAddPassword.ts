import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddPassword1587051358858 implements MigrationInterface {
  name = "UserAddPassword1587051358858";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "firstName" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "firstName" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "password"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "username"`,
      undefined
    );
  }
}
