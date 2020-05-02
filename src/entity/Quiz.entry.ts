import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoundEntity } from "./Round.entry";

@ObjectType("Quiz")
@Entity("quiz")
export class QuizEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => [RoundEntity])
  @OneToMany((type) => RoundEntity, (round) => round.quiz, { cascade: true })
  rounds: RoundEntity[];
}
