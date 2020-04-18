import { FieldResolver, Resolver, Root } from "type-graphql";
import * as games from "../controllers/Game.controller";
import * as users from "../controllers/User.controller";
import { PlayerEntry } from "../entity/Player";

@Resolver(() => PlayerEntry)
export class PlayerResolver {
  @FieldResolver()
  async user(@Root() player: PlayerEntry) {
    return users.findUserById(player.userId);
  }

  @FieldResolver()
  async game(@Root() player: PlayerEntry) {
    return games.findGameById(player.gameId);
  }
}
