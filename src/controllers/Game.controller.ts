import { FindOneOptions } from "typeorm";
import {
  entryGameStateToServiceGameState,
  extractGameSettingsFromEntry,
  serviceGameStateToEntryGameState,
} from "../dto/Game.dto";
import { GameEntity } from "../entity/Game";
import GameService, {
  GameSettings,
  GameState,
  GameStatePayload,
} from "../service/Game";
import * as users from "./User.controller";
import * as quizzes from "./Quiz.controller";

export async function createGame(payload: {
  creatorId: number;
  userIds: number[];
  quizId: number;
}) {
  const { creatorId, userIds, quizId } = payload;
  const players = await users.findUsers(userIds);
  const creator = await users.findUserById(creatorId);

  const serviceState = GameService.createInitialState({
    playerIds: players.map(({ id }) => id),
    firstRoundId: 1,
  });

  const entryState = serviceGameStateToEntryGameState(serviceState);

  const game = GameEntity.create({
    state: entryState,
    quizId,
    creator,
  });
  game.players = Promise.resolve(players);
  await game.save();
  return game;
}

export async function findGameById(
  gameId: number,
  options?: FindOneOptions<GameEntity>
) {
  return GameEntity.findOne(gameId, options);
}

async function getStateAndSettingsByGameId(gameId: number) {
  const gameEntry = await findGameById(gameId, { cache: 1000 });
  const players = await gameEntry.players;
  const quiz = await quizzes.findFullQuizById(gameEntry.quizId);
  const currentGameState: GameStatePayload = gameEntry.state;
  const gameSettings: GameSettings = extractGameSettingsFromEntry({
    game: gameEntry,
    players,
    quiz,
  });

  return {
    settings: gameSettings,
    state: entryGameStateToServiceGameState(currentGameState),
  };
}

export async function selectFirstPlayer(payload: {
  gameId: number;
  playerId: number;
}): Promise<GameEntity> {
  const { gameId, playerId } = payload;
  const gameEntry = await findGameById(gameId, { cache: 1000 });
  const { settings, state } = await getStateAndSettingsByGameId(gameId);

  const nextState = GameService.selectFirstPlayer(
    {
      playerId,
    },
    state,
    settings
  );

  gameEntry.state = serviceGameStateToEntryGameState(nextState);
  await gameEntry.save();
  return gameEntry;
}

export async function selectQuestion(payload: {
  gameId: number;
  playerId: number;
  questionId: number;
}): Promise<GameEntity> {
  const { gameId, playerId, questionId } = payload;
  const gameEntry = await findGameById(gameId, { cache: 1000 });
  const { settings, state } = await getStateAndSettingsByGameId(gameId);

  const nextState = GameService.selectQuestion(
    {
      playerId,
      questionId,
    },
    state,
    settings
  );

  gameEntry.state = serviceGameStateToEntryGameState(nextState);
  await gameEntry.save();
  return gameEntry;
}

export async function captureQuestion(payload: {
  gameId: number;
  playerId: number;
}): Promise<GameEntity> {
  const { gameId, playerId } = payload;
  const gameEntry = await findGameById(gameId, { cache: 1000 });
  const { settings, state } = await getStateAndSettingsByGameId(gameId);

  const nextState = GameService.captureQuestion(
    {
      playerId,
    },
    state,
    settings
  );

  gameEntry.state = serviceGameStateToEntryGameState(nextState);
  await gameEntry.save();
  return gameEntry;
}

export async function answer(payload: {
  gameId: number;
  playerId: number;
  answer: string;
}): Promise<GameEntity> {
  const { gameId, playerId, answer } = payload;
  const gameEntry = await findGameById(gameId, { cache: 1000 });
  const { settings, state } = await getStateAndSettingsByGameId(gameId);

  const nextState = GameService.answer(
    {
      playerId,
      answer,
    },
    state,
    settings
  );

  gameEntry.state = serviceGameStateToEntryGameState(nextState);
  await gameEntry.save();
  return gameEntry;
}
