import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  RelationId,
} from "typeorm";
import { Field, ID, ObjectType, Int } from "type-graphql";
import { GameState, GameStatePayload, PlayerScore } from "../controllers/Game";
import { User } from "./User";

@ObjectType("PlayerScore")
class PlayerScoreObjectType implements PlayerScore {
  @Field()
  playerId: number;

  @Field()
  score: number;
}

@ObjectType("GameState")
class GameStateObjectType implements GameStatePayload {
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

  @Field(() => [PlayerScoreObjectType])
  readonly playerScores: PlayerScore[]; //userId-score
}

@ObjectType()
@Entity("Game")
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;

  @RelationId((gane: Game) => gane.creator) // you need to specify target relation
  creatorUserId: number;

  @Field(() => GameStateObjectType)
  @Column({ type: "jsonb" })
  state: GameState;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
