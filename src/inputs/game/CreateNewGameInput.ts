import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNewGameInput {
  @Field()
  roomId: number;

  @Field()
  quizId: number;
}
