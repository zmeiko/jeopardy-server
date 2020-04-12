import { Field, InputType, Int } from "type-graphql";

@InputType()
export class SelectQuestionInput {
  @Field()
  userId: number;

  @Field()
  questionId: number;

  @Field()
  gameId: number;
}
