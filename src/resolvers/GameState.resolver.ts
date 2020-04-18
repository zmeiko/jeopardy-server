import { FieldResolver, Resolver, Root } from "type-graphql";
import * as users from "../controllers/User.controller";
import { GameStateEntry } from "../entity/GameState";
import { User } from "../entity/User";

@Resolver(() => GameStateEntry)
export class GameStateResolver {
  @FieldResolver()
  async answeringPlayer(@Root() state: GameStateEntry): Promise<User> {
    return (await users.findUserById(state.answeringPlayerId, {
      cache: 1000,
    }))!;
  }
}
