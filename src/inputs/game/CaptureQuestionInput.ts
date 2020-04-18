import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CaptureQuestionInput {
  @Field()
  userId: number;

  @Field()
  gameId: number;
}
