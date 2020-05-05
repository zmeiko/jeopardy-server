import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
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
  SelectQuestionInput,
  CaptureQuestionInput,
} from "../inputs/game";
import { DEFAULT_SETTINGS } from "../service/game";
import { Context } from "../types/Context";

type OnChangeGameState = {
  gameId: number;
};

const CHANGE_GAME_STATE = "CHANGE_GAME_STATE";

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
    const creatorId = ctx!.user!.userId!;
    const game = await games.createGame({
      ...data,
      creatorId,
    });
    return game;
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async selectQuestion(
    @Arg("data") data: SelectQuestionInput,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { gameId, questionId } = data;
    const game = await games.selectQuestion({
      gameId: gameId,
      playerId: ctx!.user!.userId!,
      questionId: questionId,
    });
    await pubSub.publish(CHANGE_GAME_STATE, {
      gameId: data.gameId,
    });
    //todo change const to GameSettings attribute
    setTimeout(
      () => this._tick({ gameId }, pubSub),
      DEFAULT_SETTINGS.CAPTURE_TIMEOUT
    );
    return game;
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async captureQuestion(
    @Arg("data") data: CaptureQuestionInput,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { gameId } = data;
    const game = await games.captureQuestion({
      gameId,
      playerId: ctx!.user!.userId!,
    });
    await pubSub.publish(CHANGE_GAME_STATE, {
      gameId: data.gameId,
    });
    //todo change const to GameSettings attribute
    setTimeout(
      () => this._tick({ gameId }, pubSub),
      DEFAULT_SETTINGS.ANSWER_TIMEOUT
    );
    return game;
  }

  @Authorized()
  @Mutation(() => GameEntity)
  async answer(
    @Arg("data") data: AnswerInput,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const game = await games.answer({
      playerId: ctx!.user!.userId!,
      gameId: data.gameId,
      answer: data.answer,
    });
    await pubSub.publish(CHANGE_GAME_STATE, {
      gameId: data.gameId,
    });
    return game;
  }

  @Authorized()
  @Query(() => GameEntity)
  game(@Arg("id", () => Int) id: number) {
    return games.findGameById(id);
  }

  @Authorized()
  @Subscription(() => GameStateEntry, {
    topics: CHANGE_GAME_STATE,
    filter: (
      params: ResolverFilterData<OnChangeGameState, { gameId: number }>
    ) => {
      const { payload, args } = params;
      return payload.gameId === args.gameId;
    },
  })
  async onChangeGameState(
    @Root() payload: OnChangeGameState,
    @Arg("gameId", () => Int) gameId: number
  ) {
    return await games.findGameStateByGameId(gameId);
  }

  private async _tick(payload: { gameId: number }, pubSub: PubSubEngine) {
    const { gameId } = payload;
    await games.tick({
      gameId: gameId,
    });
    await pubSub.publish(CHANGE_GAME_STATE, {
      gameId,
    });
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
