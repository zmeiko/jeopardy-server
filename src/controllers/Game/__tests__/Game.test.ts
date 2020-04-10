import { GameStatePayload } from "../Game.types";
import * as gameController from "../Game.controller";

test("test select first player", () => {
  const emptyState: GameStatePayload = gameController.createGame();

  const gameState = gameController.selectFirstPlayer({ userId: 1 }, emptyState);
  expect(gameState.currentPlayerId).toEqual(1);
});

test("test select first player after selected", () => {
  let state: GameStatePayload = gameController.createGame();
  state = gameController.selectFirstPlayer({ userId: 1 }, state);
  expect(() =>
    gameController.selectFirstPlayer({ userId: 2 }, state)
  ).toThrowError();
});
