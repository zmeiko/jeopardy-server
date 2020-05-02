import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameEntity } from "./Game.entry";
import { UserEntry } from "./User.entry";

@ObjectType("Player")
@Entity("player")
export class PlayerEntry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public userId!: number;

  @Column()
  public gameId!: number;

  @Field()
  @Column()
  public score: number;

  @Field(() => GameEntity)
  @ManyToOne((type) => GameEntity, (game) => game.players)
  @JoinColumn()
  public game!: GameEntity;

  @Field(() => UserEntry)
  @ManyToOne((type) => UserEntry)
  @JoinColumn()
  public user!: UserEntry;
}
