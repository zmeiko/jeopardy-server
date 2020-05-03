import { FindOneOptions } from "typeorm";
import {
  toServiceGameState,
  toGameSettings,
  serviceGameStateToEntryGameState,
} from "../dto/Game.dto";
import { GameEntity } from "../entity/Game.entry";
import { GameStateEntry } from "../entity/GameState.entry";
import { PlayerEntry } from "../entity/Player.entry";
import GameService, { GameSettings, GameStatePayload } from "../service/game";
import * as users from "./User.controller";
import * as rooms from "./Room.controller";
import * as quizzes from "./Quiz.controller";

export async function findAll() {
  return GameEntity.find();
}

export async function createGame(payload: {
  creatorId: number;
  roomId: number;
  quizId: number;
}) {
  const { creatorId, roomId, quizId } = payload;
  const room = await rooms.findRoomById(roomId);
  const quiz = await quizzes.findFullQuizById(quizId);
  const gameUsers = await room.users;
  const creator = await users.findUserById(creatorId);

  const stateService = GameService.createInitialState({
    playerIds: gameUsers.map(({ id }) => id),
    firstRoundId: quiz.rounds[0].id,
  });

  const game = GameEntity.create({
    quiz,
    creator,
  });

  game.players = Promise.resolve(
    gameUsers.map(
      (user): PlayerEntry =>
        PlayerEntry.create({
          userId: user.id,
          score: 0,
        })
    )
  );

  await game.save();

  const stateEntry = GameStateEntry.create({
    ...serviceGameStateToEntryGameState(stateService),
    gameId: game.id,
  });

  await stateEntry.save();
  return game;
}

export async function findGameById(
  gameId: number,
  options?: FindOneOptions<GameEntity>
): Promise<GameEntity | undefined> {
  return GameEntity.findOne(gameId, options);
}

export async function findGameStateByGameId(gameId: number) {
  return GameStateEntry.findOne({
    where: {
      gameId,
    },
  });
}

async function getStateAndSettingsByGameId(gameId: number) {
  const gameEntry = await findGameById(gameId, { cache: 1000 });
  const stateEntry = await findGameStateByGameId(gameEntry.id);
  const players = await gameEntry.players;
  const quiz = await quizzes.findFullQuizById(gameEntry.quizId);

  const gameSettings: GameSettings = toGameSettings({
    game: gameEntry,
    players,
    quiz,
  });

  return {
    settings: gameSettings,
    state: toServiceGameState({ entryGameState: stateEntry, players }),
  };
}

async function saveNewGameState(payload: {
  gameId: number;
  state: GameStatePayload;
}): Promise<GameEntity> {
  const { gameId, state } = payload;
  const gameEntry = await findGameById(gameId);

  let stateEntry = await findGameStateByGameId(gameEntry.id);
  const newEntryState = serviceGameStateToEntryGameState(state);
  stateEntry = GameStateEntry.merge(stateEntry, newEntryState);
  await stateEntry.save();

  // Update scores
  await Promise.all(
    state.playerScores.map((servicePlayer) =>
      PlayerEntry.update(
        {
          userId: servicePlayer.playerId,
          gameId,
        },
        {
          score: servicePlayer.score,
        }
      )
    )
  );

  return gameEntry;
}

type GameAction = ({
  settings: GameSettings,
  state: GameStatePayload,
}) => Promise<GameStatePayload>;

async function makeGameAction(payload: { gameId: number }, action: GameAction) {
  const { gameId } = payload;
  const { settings, state } = await getStateAndSettingsByGameId(gameId);
  const newState = await action({ settings, state });
  const game = await saveNewGameState({ gameId, state: newState });
  return game;
}

export async function selectFirstPlayer(payload: {
  gameId: number;
  playerId: number;
}): Promise<GameEntity> {
  const { gameId, playerId } = payload;
  return await makeGameAction({ gameId }, async ({ state, settings }) =>
    GameService.selectFirstPlayer(
      {
        playerId,
      },
      state,
      settings
    )
  );
}

export async function selectQuestion(payload: {
  gameId: number;
  playerId: number;
  questionId: number;
}): Promise<GameEntity> {
  const { gameId, playerId, questionId } = payload;
  return await makeGameAction({ gameId }, async ({ state, settings }) =>
    GameService.selectQuestion(
      {
        playerId,
        questionId,
      },
      state,
      settings
    )
  );
}

export async function captureQuestion(payload: {
  gameId: number;
  playerId: number;
}): Promise<GameEntity> {
  const { gameId, playerId } = payload;
  return await makeGameAction({ gameId }, async ({ state, settings }) =>
    GameService.captureQuestion(
      {
        playerId,
      },
      state,
      settings
    )
  );
}

export async function answer(payload: {
  gameId: number;
  playerId: number;
  answer: string;
}): Promise<GameEntity> {
  const { gameId, playerId, answer } = payload;
  return await makeGameAction({ gameId }, async ({ state, settings }) =>
    GameService.answer(
      {
        playerId,
        answer,
      },
      state,
      settings
    )
  );
}

export async function tick(payload: { gameId: number }): Promise<GameEntity> {
  const { gameId } = payload;
  return await makeGameAction({ gameId }, async ({ state, settings }) =>
    GameService.tick(state, settings)
  );
}
