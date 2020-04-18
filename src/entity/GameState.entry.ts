import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameEntity } from "./Game.entry";
import { UserEntry } from "./User.entry";

@ObjectType("GameState")
@Entity("game_state")
export class GameStateEntry extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => GameEntity)
  @JoinColumn()
  game: GameEntity;

  @Field()
  @Column({
    nullable: true,
  })
  stateName: string | null;

  @Field()
  @Column({
    nullable: true,
  })
  currentRoundId: number;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  currentPlayerId: number | null;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  selectedQuestionId: number | null;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  answeringPlayerId: number | null;

  @Field((type) => UserEntry, { nullable: true })
  answeringPlayer?: UserEntry;

  @Field(() => [Int])
  @Column({
    type: "simple-array",
    nullable: true,
  })
  answeredPlayerIds: number[];

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  readonly cardSelectionAt: Date | null;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  readonly questionCaptureAt?: Date | null;

  @Field(() => [Int])
  @Column({
    nullable: true,
    type: "simple-array",
  })
  readonly openedQuestionsIds: number[];
}
