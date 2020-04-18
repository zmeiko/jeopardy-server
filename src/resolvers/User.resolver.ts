import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import * as users from "../controllers/User.controller";
import { UserEntry } from "../entity/User.entry";
import { Context } from "../types/Context";

@Resolver(() => UserEntry)
export class UserResolver {
  @Authorized()
  @Query(() => [UserEntry])
  users() {
    return users.findAll();
  }

  @Authorized()
  @Query(() => UserEntry)
  user(@Arg("id") id: number) {
    return users.findUserById(id);
  }

  @Authorized()
  @Query(() => UserEntry)
  me(@Ctx() ctx: Context) {
    const userId = ctx.user.userId!;
    return users.findUserById(userId);
  }
}
