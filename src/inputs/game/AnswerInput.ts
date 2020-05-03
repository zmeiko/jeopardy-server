import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AnswerInput {
  @Field()
  answer: string;

  @Field(() => Int)
  gameId: number;
}
