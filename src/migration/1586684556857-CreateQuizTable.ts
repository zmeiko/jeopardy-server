import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuizTable1586684556857 implements MigrationInterface {
  name = "CreateQuizTable1586684556857";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "title" character varying, "path" character varying, "answer" character varying NOT NULL, "themeId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "game" ADD "quizId" integer`,
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
      `ALTER TABLE "game" DROP COLUMN "quizId"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "quiz"`, undefined);
    await queryRunner.query(`DROP TABLE "round"`, undefined);
    await queryRunner.query(`DROP TABLE "theme"`, undefined);
    await queryRunner.query(`DROP TABLE "question"`, undefined);
  }
}
