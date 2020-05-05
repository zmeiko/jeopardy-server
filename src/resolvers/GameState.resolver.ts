import { FieldResolver, Resolver, Root } from "type-graphql";
import * as games from "../controllers/Game.controller";
import * as users from "../controllers/User.controller";
import { GameEventEntity } from "../entity/GameEvent.entry";
import { GameStateEntry } from "../entity/GameState.entry";
import { UserEntry } from "../entity/User.entry";

@Resolver(() => GameStateEntry)
export class GameStateResolver {
  @FieldResolver()
  async answeringPlayer(
    @Root() state: GameStateEntry
  ): Promise<UserEntry | undefined> {
    if (state.answeringPlayerId) {
      return await users.findUserById(state.answeringPlayerId, {
        cache: 1000,
      });
    }
  }

  @FieldResolver()
  async events(@Root() state: GameEventEntity): Promise<GameEventEntity[]> {
    return await games.findGameEventsByGameId(state.gameId);
  }
}
