import { serviceGameStateToEntryGameState } from "../dto/Game.dto";
import * as gameService from "../service/Game";
import { Game } from "../entity/Game";
import * as users from "./User.controller";

export async function createGame(payload: {
  creatorId: number;
  userIds: number[];
}) {
  const { creatorId, userIds } = payload;
  const players = await users.findUsers(userIds);
  const creator = await users.findUserById(creatorId);

  const serviceState = gameService.createInitialState({
    playerIds: players.map(({ id }) => id),
    firstRoundId: 1,
  });

  const entryState = serviceGameStateToEntryGameState(serviceState);

  const game = Game.create({
    state: entryState,
    creator,
  });
  game.players = Promise.resolve(players);
  await game.save();
  return game;
}

export async function findGameById(gameId: number) {
  return Game.findOne(gameId);
}
