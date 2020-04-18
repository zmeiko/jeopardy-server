import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { GameStateEntry } from "./GameState";
import { PlayerEntry } from "./Player";
import { QuizEntity } from "./Quiz";
import { User } from "./User";

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
  @OneToOne((type) => GameStateEntry, { cascade: true })
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
