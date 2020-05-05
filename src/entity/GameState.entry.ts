import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { GameEntity } from "./Game.entry";
import { GameEventEntity } from "./GameEvent.entry";
import { UserEntry } from "./User.entry";

@ObjectType("GameState")
@Entity("game_state")
export class GameStateEntry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((type) => GameEntity, { cascade: true })
  @JoinColumn()
  game?: GameEntity;

  @Column()
  @RelationId((gameStateEntry: GameStateEntry) => gameStateEntry.game)
  gameId!: number;

  @Field()
  @Column({
    nullable: true,
  })
  stateName!: string;

  @Field()
  @Column({
    nullable: true,
  })
  currentRoundId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  @Column("integer", {
    nullable: true,
  })
  currentPlayerId?: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  @Column("integer", {
    nullable: true,
  })
  selectedQuestionId?: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  @Column("integer", {
    nullable: true,
  })
  answeringPlayerId?: number | null;

  @Field((type) => UserEntry, { nullable: true })
  answeringPlayer?: UserEntry;

  @Field(() => [Int])
  @Column({
    type: "simple-array",
    nullable: true,
  })
  answeredPlayerIds!: number[];

  @Field(() => Date, {
    nullable: true,
  })
  @Column("timestamp", {
    nullable: true,
  })
  readonly cardSelectionAt?: Date | null;

  @Field(() => Date, {
    nullable: true,
  })
  @Column("timestamp", {
    nullable: true,
  })
  readonly questionCaptureAt?: Date | null;

  @Field(() => [Int])
  @Column({
    nullable: true,
    type: "simple-array",
  })
  readonly openedQuestionsIds!: number[];

  @Field(() => [GameEventEntity])
  readonly events?: GameEventEntity[];
}
