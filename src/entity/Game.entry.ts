import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { GameStateEntry } from "./GameState.entry";
import { PlayerEntry } from "./Player.entry";
import { QuizEntity } from "./Quiz.entry";
import { UserEntry } from "./User.entry";

@ObjectType("Game")
@Entity("game")
export class GameEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => UserEntry)
  @ManyToOne(() => UserEntry)
  creator: UserEntry;

  @Column()
  @RelationId((game: GameEntity) => game.creator)
  creatorId: number;

  @Field(() => GameStateEntry)
  @OneToOne((type) => GameStateEntry, { cascade: true })
  state: GameStateEntry;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => QuizEntity)
  @ManyToOne((type) => QuizEntity, { nullable: false })
  quiz: QuizEntity;

  @Column()
  @RelationId((game: GameEntity) => game.quiz)
  quizId: number;

  @Field(() => [PlayerEntry])
  @OneToMany((type) => PlayerEntry, (player) => player.game, {
    cascade: true,
  })
  players: Promise<PlayerEntry[]>;
}
