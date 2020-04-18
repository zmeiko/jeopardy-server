import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameStateTable1587211770995 implements MigrationInterface {
  name = "CreateGameStateTable1587211770995";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game_state" ("id" SERIAL NOT NULL, "stateName" character varying, "currentRoundId" integer, "currentPlayerId" integer, "selectedQuestionId" integer, "answeringPlayerId" integer, "answeredPlayerIds" text, "cardSelectionAt" TIMESTAMP, "questionCaptureAt" TIMESTAMP, "openedQuestionsIds" text, "gameId" integer, CONSTRAINT "REL_dc92896f0725c0cf0127b50eb9" UNIQUE ("gameId"), CONSTRAINT "PK_e7b8f9fb87d56841a7aaa284f52" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" DROP COLUMN "state"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_state" ADD CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game_state" DROP CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD "state" jsonb NOT NULL`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "game_state"`, undefined);
  }
}
