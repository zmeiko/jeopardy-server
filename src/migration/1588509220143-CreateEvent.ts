import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEvent1588509220143 implements MigrationInterface {
  name = "CreateEvent1588509220143";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game_event" ("id" SERIAL NOT NULL, "gameId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "finishedAt" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "properties" text NOT NULL, CONSTRAINT "PK_d979b8a4d47b02b8f87322f33e0" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD CONSTRAINT "FK_71fa66873a3ea8dabfa3b267432" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP CONSTRAINT "FK_71fa66873a3ea8dabfa3b267432"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "game_event"`, undefined);
  }
}
