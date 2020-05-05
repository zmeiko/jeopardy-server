import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CaptureQuestionInput {
  @Field(() => Int)
  gameId!: number;
}
