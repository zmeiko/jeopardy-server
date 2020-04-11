import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import * as games from "../controllers/Game.controller";
import * as users from "../controllers/User.controller";
import { Game } from "../entity/Game";
import { User } from "../entity/User";
import { CreateNewGameInput } from "../inputs/CreateNewGameInput";

@Resolver(() => Game)
export class GameResolver {
  @Query(() => [Game])
  games() {
    return Game.find();
  }

  @Mutation(() => Game)
  async createGame(@Arg("data") data: CreateNewGameInput) {
    const game = await games.createGame(data);
    return game;
  }

  @Query(() => Game)
  game(@Arg("id") id: number) {
    return games.findGameById(id);
  }

  @FieldResolver()
  async players(@Root() game: Game) {
    return await game.players;
  }

  @FieldResolver()
  async creator(@Root() game: Game): Promise<User> {
    return (await users.findUserById(game.creatorUserId, { cache: 1000 }))!;
  }
}
