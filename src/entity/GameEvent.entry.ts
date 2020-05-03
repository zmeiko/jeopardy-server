import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { EventPayload, EventType } from "../service/game";
import { JsonType } from "../utils/graphql/JsonType";
import { GameEntity } from "./Game.entry";

@ObjectType("GameEvent")
@Entity("game_event")
export class GameEventEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => GameEntity, { nullable: false })
  @JoinColumn()
  game: GameEntity;

  @Column()
  @RelationId((event: GameEventEntity) => event.game)
  gameId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ nullable: false })
  finishedAt: Date;

  @Field()
  @Column()
  type: EventType;

  @Field(() => JsonType)
  @Column("simple-json")
  properties: EventPayload;
}
