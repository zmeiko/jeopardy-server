import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { GameEntity } from "./Game.entry";
import { UserEntry } from "./User.entry";

@ObjectType("Player")
@Entity("player")
export class PlayerEntry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => GameEntity)
  @ManyToOne((type) => GameEntity, (game) => game.players)
  @JoinColumn()
  public game?: GameEntity;

  @Column({
    nullable: false,
  })
  @RelationId((player: PlayerEntry) => player.game)
  public gameId!: number;

  @Field()
  @Column({
    nullable: false,
  })
  public score!: number;

  @Field(() => UserEntry)
  @ManyToOne((type) => UserEntry)
  @JoinColumn()
  public user?: UserEntry;

  @Column({
    nullable: false,
  })
  @RelationId((player: PlayerEntry) => player.user)
  public userId!: number;
}
