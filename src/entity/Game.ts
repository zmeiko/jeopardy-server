import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { GameStatePayload, PlayerScore } from "../service/Game";
import { PlayerEntry } from "./Player";
import { QuizEntity } from "./Quiz";
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

@ObjectType("Game")
@Entity("game")
export class GameEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;

  @RelationId((game: GameEntity) => game.creator)
  creatorUserId: number;

  @Field(() => GameStateEntry)
  @Column({ type: "jsonb" })
  state: GameStateEntry;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => QuizEntity)
  @ManyToOne((type) => QuizEntity, { nullable: false })
  quiz: QuizEntity;

  @RelationId((game: GameEntity) => game.quiz)
  quizId: number;

  @Field(() => [PlayerEntry])
  @OneToMany((type) => PlayerEntry, (player) => player.game, {
    cascade: true,
  })
  players: Promise<PlayerEntry[]>;
}
