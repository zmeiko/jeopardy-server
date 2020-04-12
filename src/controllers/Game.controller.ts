import { serviceGameStateToEntryGameState } from "../dto/Game.dto";
import { GameEntity } from "../entity/Game";
import * as gameService from "../service/Game";
import * as users from "./User.controller";

export async function createGame(payload: {
  creatorId: number;
  userIds: number[];
  quizId: number;
}) {
  const { creatorId, userIds, quizId } = payload;
  const players = await users.findUsers(userIds);
  const creator = await users.findUserById(creatorId);

  const serviceState = gameService.createInitialState({
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

export async function findGameById(gameId: number) {
  return GameEntity.findOne(gameId);
}
