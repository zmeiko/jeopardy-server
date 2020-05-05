import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpInput {
  @Field()
  username!: string;

  @Field()
  password!: string;
}
