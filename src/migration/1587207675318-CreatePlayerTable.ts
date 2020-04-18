import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlayerTable1587207675318 implements MigrationInterface {
  name = "CreatePlayerTable1587207675318";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "player" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "gameId" integer NOT NULL, "score" integer NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "room_users_user" ("roomId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e811974018202e969e902e794de" PRIMARY KEY ("roomId", "userId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_764292bbbb93544a050f844c49" ON "room_users_user" ("roomId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c675caa22685ba1e0ebeb0f65" ON "room_users_user" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_764292bbbb93544a050f844c499" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_764292bbbb93544a050f844c499"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6c675caa22685ba1e0ebeb0f65"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_764292bbbb93544a050f844c49"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "room_users_user"`, undefined);
    await queryRunner.query(`DROP TABLE "player"`, undefined);
  }
}
