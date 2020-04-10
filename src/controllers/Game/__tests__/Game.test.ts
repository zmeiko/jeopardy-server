import { createGame, selectFirstPlayer } from "../actions";
import { generateRounds } from "./utils";

test("test select first player", () => {
  const { settings, state } = createGame({
    creatorPlayerId: 1,
    playerIds: [1, 2],
    rounds: generateRounds(),
  });

  const gameState = selectFirstPlayer({ userId: 1 }, state, settings);
  expect(gameState.currentPlayerId).toEqual(1);
});

test("test select first player after selected", () => {
  const data = createGame({
    creatorPlayerId: 1,
    playerIds: [1, 2],
    rounds: generateRounds(),
  });
  const settings = data.settings;
  let state = data.state;
  state = selectFirstPlayer({ userId: 1 }, state, settings);
  expect(() =>
    selectFirstPlayer({ userId: 2 }, state, settings)
  ).toThrowError();
});
