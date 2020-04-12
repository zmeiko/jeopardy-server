import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuestionEntity } from "./Question";
import { QuizEntity } from "./Quiz";
import { RoundEntity } from "./Round";

@ObjectType("Theme")
@Entity("theme")
export class ThemeEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => [QuestionEntity])
  @OneToMany((type) => QuestionEntity, (question) => question.theme, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @Field((type) => RoundEntity)
  @ManyToOne((type) => RoundEntity, (round) => round.themes)
  round: QuizEntity;
}
