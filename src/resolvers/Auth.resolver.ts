import * as Cookies from "cookies";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entity/User";
import { applyToken } from "../service/Auth";

@ObjectType()
class AuthToken {
  @Field()
  token: string;
}

@InputType()
class AuthTokenInput {
  @Field()
  login: string;

  @Field()
  password: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthToken)
  async login(
    @Arg("data") data: AuthTokenInput,
    @Ctx() context: { cookies: Cookies }
  ): Promise<AuthToken> {
    // todo: add check login and password
    const token = applyToken(1, context.cookies);
    return {
      token,
    };
  }

  @Authorized()
  @Query(() => AuthToken)
  checkAuth(@Ctx() ctx: any): AuthToken {
    return {
      token: "t",
    };
  }
}
