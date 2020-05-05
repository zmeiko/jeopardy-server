import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { QuestionEntity } from "./Question.entry";
import { QuizEntity } from "./Quiz.entry";
import { RoundEntity } from "./Round.entry";

@ObjectType("Theme")
@Entity("theme")
export class ThemeEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field((type) => [QuestionEntity])
  @OneToMany((type) => QuestionEntity, (question) => question.theme, {
    cascade: true,
  })
  questions?: QuestionEntity[];

  @Field((type) => RoundEntity)
  @ManyToOne((type) => RoundEntity, (round) => round.themes)
  round?: QuizEntity;

  @Column()
  @RelationId((theme: ThemeEntity) => theme.round)
  roundId!: number;
}
