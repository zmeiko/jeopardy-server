import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import * as auth from "../controllers/Auth.controller";
import * as users from "../controllers/User.controller";
import { LoginInput } from "../inputs/Auth/LoginInput";
import { SignUpInput } from "../inputs/Auth/SignUpInput";
import { updateCookies } from "../service/Auth/cookiesManager";
import { Context } from "../types/Context";

@ObjectType()
class AuthTokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthTokens)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() context: Context
  ): Promise<AuthTokens> {
    const isValid = await auth.checkCredentials(data);
    if (!isValid) {
      throw new Error("Incorrect username or password");
    }
    const { accessToken, refreshToken } = await auth.createTokens(data);
    updateCookies({ accessToken, refreshToken }, context.ctx.cookies);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => AuthTokens)
  async signUp(@Arg("data") data: SignUpInput, @Ctx() context: Context) {
    const { username } = data;
    await users.createUser(data);
    const { accessToken, refreshToken } = await auth.createTokens({ username });
    updateCookies({ accessToken, refreshToken }, context.ctx.cookies);
    return {
      accessToken,
      refreshToken,
    };
  }
}
