import { MigrationInterface, QueryRunner } from "typeorm";

export class SetGameQuizIdNonNull1586692190703 implements MigrationInterface {
  name = "SetGameQuizIdNonNull1586692190703";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "price" DROP DEFAULT`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" DROP CONSTRAINT "FK_95bd197db52e87a3113380103c4"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "quizId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_95bd197db52e87a3113380103c4" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game" DROP CONSTRAINT "FK_95bd197db52e87a3113380103c4"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "quizId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_95bd197db52e87a3113380103c4" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "price" SET DEFAULT 200`,
      undefined
    );
  }
}
