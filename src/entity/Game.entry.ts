import { Field, Int, ObjectType } from "type-graphql";
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
import { GameEventEntity } from "./GameEvent.entry";
import { GameStateEntry } from "./GameState.entry";
import { PlayerEntry } from "./Player.entry";
import { QuizEntity } from "./Quiz.entry";
import { UserEntry } from "./User.entry";

@ObjectType("Game")
@Entity("game")
export class GameEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => UserEntry)
  @ManyToOne(() => UserEntry)
  creator?: UserEntry;

  @Column({ nullable: false })
  @RelationId((game: GameEntity) => game.creator)
  creatorId!: number;

  @Field(() => GameStateEntry)
  @OneToOne(() => GameStateEntry, { cascade: true })
  state?: GameStateEntry;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => QuizEntity)
  @ManyToOne(() => QuizEntity, { nullable: false })
  quiz!: QuizEntity;

  @Column({ nullable: false })
  @RelationId((game: GameEntity) => game.quiz)
  quizId!: number;

  @Field(() => [PlayerEntry])
  @OneToMany(() => PlayerEntry, (player) => player.game, {
    cascade: true,
  })
  players!: Promise<PlayerEntry[]>;

  @Field(() => [GameEventEntity])
  @OneToMany(() => GameEventEntity, (event) => event.game, {
    cascade: ["insert"],
  })
  events!: Promise<GameEventEntity>;
}
