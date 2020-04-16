import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameEntity } from "./Game";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Field()
  @Column({
    nullable: true,
  })
  firstName: string;

  @Field()
  @Column({
    nullable: true,
  })
  lastName: string;

  @Field((type) => [GameEntity])
  @ManyToMany((type) => GameEntity, (game) => game.players)
  games: Promise<GameEntity[]>;
}
