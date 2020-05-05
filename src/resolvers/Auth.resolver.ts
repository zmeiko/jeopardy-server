import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import * as auth from "../controllers/Auth.controller";
import * as users from "../controllers/User.controller";
import { LoginInput } from "../inputs/auth/LoginInput";
import { SignUpInput } from "../inputs/auth/SignUpInput";
import { removeCookies, updateCookies } from "../service/auth/cookies";
import { Context } from "../types/Context";
import { UserInputError } from "apollo-server-koa";

@ObjectType()
class AuthTokens {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@ObjectType()
class LogoutResult {
  @Field()
  success!: boolean;
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
      throw new UserInputError("Incorrect username or password");
    }
    const { accessToken, refreshToken } = await auth.createTokens(data);

    if (context?.cookies) {
      updateCookies({ accessToken, refreshToken }, context.cookies);
    }

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

    if (context?.cookies) {
      updateCookies({ accessToken, refreshToken }, context.cookies);
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => LogoutResult)
  async logout(@Ctx() context: Context) {
    const userId = context?.user?.userId;
    if (userId) {
      await auth.logout({ userId });
    }
    if (context?.cookies) {
      removeCookies(context.cookies);
    }
    return {
      success: true,
    };
  }
}
