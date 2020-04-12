import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceColumnToQuestion1586690859071
  implements MigrationInterface {
  name = "AddPriceColumnToQuestion1586690859071";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ADD "price" integer NOT NULL DEFAULT (200)`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP COLUMN "price"`,
      undefined
    );
  }
}
