import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateNewGameInput {
  @Field()
  creatorId: number;

  @Field(() => [Int])
  userIds: number[];
}
