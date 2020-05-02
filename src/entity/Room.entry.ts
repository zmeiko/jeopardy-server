import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntry } from "./User.entry";

@ObjectType("Room")
@Entity("room")
export class RoomEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [UserEntry])
  @ManyToMany((type) => UserEntry)
  @JoinTable()
  users: Promise<UserEntry[]>;
}
