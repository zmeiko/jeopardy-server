import {
  createInitialState,
  selectQuestion,
  selectFirstPlayer,
  answer,
  captureQuestion,
  createGameSettings,
} from "../actions";
import { GameRound } from "../Game.types";
import { concatAllQuestionInRound } from "../states/helper";
import { ACTIONS_STATES } from "../states/states.const";
import { generateRounds } from "./utils";

function createInitialPayload(payload?: {
  creatorPlayerId?: number;
  playerIds: number[];
  rounds: GameRound[];
}) {
  const { creatorPlayerId, playerIds, rounds = generateRounds() } =
    payload || {};
  const settings = createGameSettings({
    playerIds,
    rounds: rounds,
    creatorPlayerId: creatorPlayerId,
  });
  const state = createInitialState({
    playerIds,
    firstRoundId: rounds[0].id,
  });
  return { settings, state };
}

test("test select first player", () => {
  const { settings, state } = createInitialPayload({
    creatorPlayerId: 1,
    playerIds: [1, 2],
    rounds: generateRounds(),
  });

  const gameState = selectFirstPlayer({ playerId: 1 }, state, settings);
  expect(gameState.currentPlayerId).toEqual(1);
});

test("test select first player after selected", () => {
  const data = createInitialPayload({
    creatorPlayerId: 1,
    playerIds: [1, 2],
    rounds: generateRounds(),
  });
  const settings = data.settings;
  let state = data.state;
  state = selectFirstPlayer({ playerId: 1 }, state, settings);
  expect(() =>
    selectFirstPlayer({ playerId: 2 }, state, settings)
  ).toThrowError();
});

test("test finish game after open all cards", () => {
  const USER_ID_1 = 1;
  const USER_ID_2 = 2;
  const data = createInitialPayload({
    creatorPlayerId: USER_ID_1,
    playerIds: [USER_ID_1, USER_ID_2],
    rounds: generateRounds({
      roundCount: 1,
      themeCount: 1,
      questionCountInRound: 2,
    }),
  });
  const settings = data.settings;
  let state = data.state;

  const allQuestions = concatAllQuestionInRound(settings.rounds[0]);

  state = selectFirstPlayer({ playerId: USER_ID_1 }, state, settings);

  allQuestions.forEach((question) => {
    state = selectQuestion(
      { playerId: USER_ID_1, questionId: question.id },
      state,
      settings
    );
    state = captureQuestion({ playerId: USER_ID_1 }, state, settings);
    state = answer({ playerId: USER_ID_1, answer: "yes" }, state, settings);
    console.log(state);
  });
  expect(state.stateName).toEqual(ACTIONS_STATES.FINISH_GAME);
});
