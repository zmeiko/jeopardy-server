import { MigrationInterface, QueryRunner } from "typeorm";

export class NonNullFieldsQuiz1588450654509 implements MigrationInterface {
  name = "NonNullFieldsQuiz1588450654509";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game_state" DROP CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_state" ALTER COLUMN "gameId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_d1da16b6b47a96ed8840a9ec687"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "themeId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "theme" DROP CONSTRAINT "FK_b362dbb8d3acc1bdff9046ec76d"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "theme" ALTER COLUMN "roundId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "round" DROP CONSTRAINT "FK_1fdc42c7f3446b3f1bc93219356"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "quizId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" DROP CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "creatorId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_state" ADD CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE "game_state" DROP CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "creatorId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "round" ALTER COLUMN "quizId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD CONSTRAINT "FK_1fdc42c7f3446b3f1bc93219356" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "theme" ALTER COLUMN "roundId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "theme" ADD CONSTRAINT "FK_b362dbb8d3acc1bdff9046ec76d" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "themeId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_d1da16b6b47a96ed8840a9ec687" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_state" ALTER COLUMN "gameId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_state" ADD CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }
}
