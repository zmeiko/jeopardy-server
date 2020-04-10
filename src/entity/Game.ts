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
import { User } from "./User";

@ObjectType()
class UserScoreObjectType {
  @Field()
  userId: string;

  @Field()
  score: number;
}

@ObjectType()
class GameStateObjectType {
  @Field()
  stateName: string | null;

  @Field()
  currentRoundId: number | null;

  @Field()
  currentPlayerId: number | null;

  @Field()
  selectedQuestionId: number | null;

  @Field()
  answeringUserId: number | null;

  @Field(() => [Int])
  readonly answeredPlayerIds: number[];

  @Field()
  readonly cardSelectionAt: Date | null;

  @Field()
  readonly questionCaptureAt?: Date | null;

  @Field(() => [Int])
  readonly openedQuestionsIds: number[];

  @Field(() => [UserScoreObjectType])
  readonly playerScore: GameEntityUserScorePayload; //userId-score
}

@ObjectType()
@Entity("Game")
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  creator: User;

  @Field()
  @RelationId((gane: Game) => gane.creator) // you need to specify target relation
  creatorUserId: number;

  @Field(() => GameStateObjectType)
  @Column({ type: "jsonb" })
  state: GameEntityStatePayload;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

interface GameEntityUserScorePayload {
  userId: number;
  score: number;
}

interface GameEntityStatePayload {
  readonly stateName: string;

  readonly currentRoundId: number;

  readonly currentPlayerId: number | null;
  readonly selectedQuestionId: number | null;

  readonly answeringUserId: number | null;
  readonly answeredPlayerIds: number[];

  readonly cardSelectionAt: Date | null;
  readonly questionCaptureAt?: Date | null;

  readonly openedQuestionsIds: number[];

  readonly playerScore: GameEntityUserScorePayload[];
}
