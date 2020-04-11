import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  RelationId,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType, Int } from "type-graphql";
import { GameStatePayload, PlayerScore } from "../service/Game";
import { User } from "./User";

@ObjectType("PlayerScore")
export class PlayerScoreEntry implements PlayerScore {
  @Field()
  playerId: number;

  @Field((type) => User)
  player: User;

  @Field()
  score: number;
}

@ObjectType("GameState")
export class GameStateEntry implements GameStatePayload {
  @Field()
  stateName: string | null;

  @Field()
  currentRoundId: number;

  @Field({
    nullable: true,
  })
  currentPlayerId: number | null;

  @Field({
    nullable: true,
  })
  selectedQuestionId: number | null;

  @Field({
    nullable: true,
  })
  answeringPlayerId: number | null;

  @Field((type) => User, { nullable: true })
  answeringPlayer?: User;

  @Field(() => [Int])
  readonly answeredPlayerIds: number[];

  @Field({
    nullable: true,
  })
  readonly cardSelectionAt: Date | null;

  @Field({
    nullable: true,
  })
  readonly questionCaptureAt?: Date | null;

  @Field(() => [Int])
  readonly openedQuestionsIds: number[];

  @Field(() => [PlayerScoreEntry])
  readonly playerScores: PlayerScore[]; //userId-score
}

@ObjectType()
@Entity("game")
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;

  @RelationId((gane: Game) => gane.creator) // you need to specify target relation
  creatorUserId: number;

  @Field(() => GameStateEntry)
  @Column({ type: "jsonb" })
  state: GameStateEntry;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => [User])
  @ManyToMany((type) => User, (user) => user.games)
  @JoinTable()
  players: Promise<User[]>;
}
