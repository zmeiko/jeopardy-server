import { Field, InputType, Int } from "type-graphql";

@InputType()
export class SelectQuestionInput {
  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  gameId: number;
}
