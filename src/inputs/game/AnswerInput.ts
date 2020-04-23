import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AnswerInput {
  @Field()
  userId: number;

  @Field()
  answer: string;

  @Field(() => Int)
  gameId: number;
}
