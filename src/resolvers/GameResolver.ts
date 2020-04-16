import {
  Arg,
  Authorized,
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
import {
  CreateNewGameInput,
  AnswerInput,
  SelectFirstPlayerInput,
  SelectQuestionInput,
  CaptureQuestionInput,
} from "../inputs/Game";

@Resolver(() => GameEntity)
export class GameResolver {
  @Authorized()
  @Query(() => [GameEntity])
  games() {
    return GameEntity.find();
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async createGame(@Arg("data") data: CreateNewGameInput) {
    const game = await games.createGame(data);
    return game;
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async selectFirstPlayer(@Arg("data") data: SelectFirstPlayerInput) {
    const game = await games.selectFirstPlayer({
      gameId: data.gameId,
      playerId: data.userId,
    });
    return game;
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async selectQuestion(@Arg("data") data: SelectQuestionInput) {
    const game = await games.selectQuestion({
      gameId: data.gameId,
      playerId: data.userId,
      questionId: data.questionId,
    });
    return game;
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async captureQuestion(@Arg("data") data: CaptureQuestionInput) {
    const game = await games.captureQuestion({
      gameId: data.gameId,
      playerId: data.userId,
    });
    return game;
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async answer(@Arg("data") data: AnswerInput) {
    const game = await games.answer({
      playerId: data.userId,
      gameId: data.gameId,
      answer: data.answer,
    });
    return game;
  }

  @Authorized()
  @Query(() => GameEntity)
  game(@Arg("id") id: number) {
    return games.findGameById(id);
  }

  @Authorized()
  @FieldResolver()
  async players(@Root() game: GameEntity) {
    return await game.players;
  }

  @Authorized()
  @FieldResolver()
  async quiz(@Root() game: GameEntity) {
    return quizzes.findQuizById(game.quizId);
  }

  @Authorized()
  @FieldResolver()
  async creator(@Root() game: GameEntity): Promise<User> {
    return (await users.findUserById(game.creatorUserId, { cache: 1000 }))!;
  }
}
