import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1587221829317 implements MigrationInterface {
  name = "Initial1587221829317";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "game_state" ("id" SERIAL NOT NULL, "stateName" character varying, "currentRoundId" integer, "currentPlayerId" integer, "selectedQuestionId" integer, "answeringPlayerId" integer, "answeredPlayerIds" text, "cardSelectionAt" TIMESTAMP, "questionCaptureAt" TIMESTAMP, "openedQuestionsIds" text, "gameId" integer, CONSTRAINT "REL_dc92896f0725c0cf0127b50eb9" UNIQUE ("gameId"), CONSTRAINT "PK_e7b8f9fb87d56841a7aaa284f52" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "player" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "gameId" integer NOT NULL, "score" integer NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "title" character varying, "path" character varying, "answer" character varying NOT NULL, "price" integer NOT NULL, "themeId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "theme" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "roundId" integer, CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "round" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quizId" integer, CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "game" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, "quizId" integer NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "game_state" ADD CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "question" ADD CONSTRAINT "FK_d1da16b6b47a96ed8840a9ec687" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "theme" ADD CONSTRAINT "FK_b362dbb8d3acc1bdff9046ec76d" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD CONSTRAINT "FK_1fdc42c7f3446b3f1bc93219356" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_95bd197db52e87a3113380103c4" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "game" DROP CONSTRAINT "FK_95bd197db52e87a3113380103c4"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" DROP CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "round" DROP CONSTRAINT "FK_1fdc42c7f3446b3f1bc93219356"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "theme" DROP CONSTRAINT "FK_b362dbb8d3acc1bdff9046ec76d"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_d1da16b6b47a96ed8840a9ec687"`,
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
      `ALTER TABLE "game_state" DROP CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92"`,
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
    await queryRunner.query(`DROP TABLE "room"`, undefined);
    await queryRunner.query(`DROP TABLE "game"`, undefined);
    await queryRunner.query(`DROP TABLE "quiz"`, undefined);
    await queryRunner.query(`DROP TABLE "round"`, undefined);
    await queryRunner.query(`DROP TABLE "theme"`, undefined);
    await queryRunner.query(`DROP TABLE "question"`, undefined);
    await queryRunner.query(`DROP TABLE "player"`, undefined);
    await queryRunner.query(`DROP TABLE "game_state"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
  }
}
