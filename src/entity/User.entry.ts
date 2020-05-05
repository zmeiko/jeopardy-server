import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType("User")
@Entity("user")
export class UserEntry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({
    unique: true,
    nullable: false,
  })
  username?: string;

  @Column({
    nullable: false,
  })
  password!: string;

  @Field()
  @Column({
    nullable: true,
  })
  firstName?: string;

  @Field()
  @Column({
    nullable: true,
  })
  lastName?: string;
}
