import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateNewGameInput {
  @Field(() => Int)
  roomId: number;

  @Field(() => Int)
  quizId: number;
}
