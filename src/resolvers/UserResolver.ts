import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import * as users from "../controllers/User.controller";
import { User } from "../entity/User";
import { Context } from "../types/Context";

@Resolver(() => User)
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  users() {
    return users.findAll();
  }

  @Authorized()
  @Query(() => User)
  user(@Arg("id") id: number) {
    return users.findUserById(id);
  }

  @Authorized()
  @Query(() => User)
  me(@Ctx() ctx: Context) {
    const userId = ctx.user.userId!;
    return users.findUserById(userId);
  }
}
