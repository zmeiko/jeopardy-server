import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPackage1587225434154 implements MigrationInterface {
  name = "AddPackage1587225434154";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "packages" ("id" SERIAL NOT NULL, "packageName" character varying NOT NULL, "importedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_020801f620e21f943ead9311c98" PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "packages"`, undefined);
  }
}
