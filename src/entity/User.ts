import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Game } from "./Game";
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field((type) => [Game])
  @ManyToMany((type) => Game, (game) => game.players)
  games: Promise<Game[]>;
}
