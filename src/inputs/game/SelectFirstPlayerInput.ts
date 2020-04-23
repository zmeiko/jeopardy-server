import { Field, InputType, Int } from "type-graphql";

@InputType()
export class SelectFirstPlayerInput {
  @Field()
  userId: number;

  @Field(() => Int)
  gameId: number;
}
