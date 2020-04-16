import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomTable1587065214220 implements MigrationInterface {
  name = "CreateRoomTable1587065214220";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "room_players_user" ("roomId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a9608f03220bee42a5a534179fb" PRIMARY KEY ("roomId", "userId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_827f6b0e4d5a9a186c0c0ff8e2" ON "room_players_user" ("roomId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_afc3340b964442387f8704ded3" ON "room_players_user" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "room_players_user" ADD CONSTRAINT "FK_827f6b0e4d5a9a186c0c0ff8e21" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "room_players_user" ADD CONSTRAINT "FK_afc3340b964442387f8704ded30" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_players_user" DROP CONSTRAINT "FK_afc3340b964442387f8704ded30"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "room_players_user" DROP CONSTRAINT "FK_827f6b0e4d5a9a186c0c0ff8e21"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_afc3340b964442387f8704ded3"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_827f6b0e4d5a9a186c0c0ff8e2"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "room_players_user"`, undefined);
    await queryRunner.query(`DROP TABLE "room"`, undefined);
  }
}
