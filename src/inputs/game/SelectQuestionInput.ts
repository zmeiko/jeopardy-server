import { Field, InputType, Int } from "type-graphql";

@InputType()
export class SelectQuestionInput {
  @Field()
  userId: number;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  gameId: number;
}
