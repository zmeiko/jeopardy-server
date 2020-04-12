import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import * as games from "../controllers/Game.controller";
import * as quizzes from "../controllers/Quiz.controller";
import * as users from "../controllers/User.controller";
import { GameEntity } from "../entity/Game";
import { User } from "../entity/User";
import { CreateNewGameInput } from "../inputs/CreateNewGameInput";

@Resolver(() => GameEntity)
export class GameResolver {
  @Query(() => [GameEntity])
  games() {
    return GameEntity.find();
  }

  @Mutation(() => GameEntity)
  async createGame(@Arg("data") data: CreateNewGameInput) {
    const game = await games.createGame(data);
    return game;
  }

  @Query(() => GameEntity)
  game(@Arg("id") id: number) {
    return games.findGameById(id);
  }

  @FieldResolver()
  async players(@Root() game: GameEntity) {
    return await game.players;
  }

  @FieldResolver()
  async quiz(@Root() game: GameEntity) {
    return quizzes.findQuizById(game.quizId);
  }

  @FieldResolver()
  async creator(@Root() game: GameEntity): Promise<User> {
    return (await users.findUserById(game.creatorUserId, { cache: 1000 }))!;
  }
}
