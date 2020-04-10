import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGame1586556475481 implements MigrationInterface {
  name = "AddGame1586556475481";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Game" ("id" SERIAL NOT NULL, "state" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "PK_cce0ee17147c1830d09c19d4d56" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "Game" ADD CONSTRAINT "FK_aa96a51a23930f3a35ba268979a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Game" DROP CONSTRAINT "FK_aa96a51a23930f3a35ba268979a"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "Game"`, undefined);
  }
}
