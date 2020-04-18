import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import * as games from "../controllers/Game.controller";
import * as quizzes from "../controllers/Quiz.controller";
import * as users from "../controllers/User.controller";
import { GameEntity } from "../entity/Game.entry";
import { GameStateEntry } from "../entity/GameState.entry";
import { UserEntry } from "../entity/User.entry";
import {
  CreateNewGameInput,
  AnswerInput,
  SelectFirstPlayerInput,
  SelectQuestionInput,
  CaptureQuestionInput,
} from "../inputs/game";
import { Context } from "../types/Context";

@Resolver(() => GameEntity)
export class GameResolver {
  @Authorized()
  @Query(() => [GameEntity])
  games() {
    return games.findAll();
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async createGame(@Arg("data") data: CreateNewGameInput, @Ctx() ctx: Context) {
    const creatorId = ctx.user.userId!;
    const game = await games.createGame({
      ...data,
      creatorId,
    });
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
  async creator(@Root() game: GameEntity): Promise<UserEntry> {
    return (await users.findUserById(game.creatorId, { cache: 1000 }))!;
  }

  @Authorized()
  @FieldResolver()
  async state(@Root() game: GameEntity): Promise<GameStateEntry> {
    return (await games.findGameStateByGameId(game.id))!;
  }
}
