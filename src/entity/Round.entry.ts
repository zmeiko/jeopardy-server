import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuizEntity } from "./Quiz.entry";
import { ThemeEntity } from "./Theme.entry";

@ObjectType("Round")
@Entity("round")
export class RoundEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => [ThemeEntity])
  @OneToMany((type) => ThemeEntity, (theme) => theme.round, { cascade: true })
  themes: ThemeEntity[];

  @ManyToOne((type) => QuizEntity, (quiz) => quiz.rounds)
  quiz: QuizEntity;
}
