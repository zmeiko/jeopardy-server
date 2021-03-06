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
import { QuizEntity } from "./Quiz.entry";
import { ThemeEntity } from "./Theme.entry";

@ObjectType("Round")
@Entity("round")
export class RoundEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field((type) => [ThemeEntity])
  @OneToMany((type) => ThemeEntity, (theme) => theme.round, { cascade: true })
  themes?: ThemeEntity[];

  @ManyToOne((type) => QuizEntity, (quiz) => quiz.rounds)
  quiz?: QuizEntity;

  @Column()
  @RelationId((round: RoundEntity) => round.quiz)
  quizId!: number;
}
