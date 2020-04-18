import { FieldResolver, Resolver, Root } from "type-graphql";
import * as users from "../controllers/User.controller";
import { GameStateEntry } from "../entity/GameState.entry";
import { UserEntry } from "../entity/User.entry";

@Resolver(() => GameStateEntry)
export class GameStateResolver {
  @FieldResolver()
  async answeringPlayer(@Root() state: GameStateEntry): Promise<UserEntry> {
    return (await users.findUserById(state.answeringPlayerId, {
      cache: 1000,
    }))!;
  }
}
