import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameTable1586602063486 implements MigrationInterface {
  name = "CreateGameTable1586602063486";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game" ("id" SERIAL NOT NULL, "state" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "game_players_user" ("gameId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f6c9473651427afacd9e37182e0" PRIMARY KEY ("gameId", "userId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8d910648c34fa95ddac401582" ON "game_players_user" ("gameId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd8735bd5c8888cc8719136d0c" ON "game_players_user" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_players_user" ADD CONSTRAINT "FK_c8d910648c34fa95ddac401582f" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_players_user" ADD CONSTRAINT "FK_fd8735bd5c8888cc8719136d0c4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game_players_user" DROP CONSTRAINT "FK_fd8735bd5c8888cc8719136d0c4"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_players_user" DROP CONSTRAINT "FK_c8d910648c34fa95ddac401582f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" DROP CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_fd8735bd5c8888cc8719136d0c"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_c8d910648c34fa95ddac401582"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "game_players_user"`, undefined);
    await queryRunner.query(`DROP TABLE "game"`, undefined);
  }
}
