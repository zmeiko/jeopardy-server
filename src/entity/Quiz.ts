import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoundEntity } from "./Round";

@ObjectType("Quiz")
@Entity("quiz")
export class QuizEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => [RoundEntity])
  @OneToMany((type) => RoundEntity, (round) => round.quiz, { cascade: true })
  rounds: RoundEntity[];
}
