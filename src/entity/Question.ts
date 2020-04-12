import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { ThemeEntity } from "./Theme";

@ObjectType()
@Entity("question")
export class QuestionEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  type: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string | null;

  @Field({ nullable: true })
  @Column({ nullable: true })
  path: string | null;

  @Field()
  @Column()
  answer: string;

  @Field()
  @Column()
  price: number;

  @Field(() => ThemeEntity)
  @ManyToOne(() => ThemeEntity, (theme) => theme.questions)
  theme: ThemeEntity;

  @RelationId((question: QuestionEntity) => question.theme)
  themeId: number;
}
