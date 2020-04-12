import { FieldResolver, Resolver, Root } from "type-graphql";
import * as users from "../controllers/User.controller";
import { GameStateEntry, PlayerScoreEntry } from "../entity/Game";
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

@Resolver(() => PlayerScoreEntry)
export class GamePlayerScoreResolver {
  @FieldResolver()
  async player(@Root() score: PlayerScoreEntry): Promise<User> {
    return (await users.findUserById(score.playerId, { cache: 1000 }))!;
  }
}
