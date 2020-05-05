import { ACTIONS_STATES } from "../../states/states.const";
import GameSettingsBuilder from "../../utils/SettingsBuilder";
import GameStateBuilder from "../../utils/StateBuilder";
import { WaitingForCardSelection } from "../../states/WaitingForCardSelection";

const USER_ID_1 = 1;
const USER_ID_2 = 2;

const ROUND_ID = 1;
const THEME_ID = 1;
const QUESTION_ID = 1;
const QUESTION_ID_2 = 2;
const QUESTION_ANSWER = "yes";

test("test select question by selected player", () => {
  const timestamp = new Date();

  const settings = new GameSettingsBuilder()
    .addUsers(USER_ID_1, USER_ID_2)
    .setCreatorId(USER_ID_1)
    .addRound({ id: ROUND_ID })
    .addTheme({ id: THEME_ID, roundId: ROUND_ID })
    .addQuestion({
      id: QUESTION_ID,
      answer: QUESTION_ANSWER,
      themeId: THEME_ID,
    })
    .build();

  const state = new GameStateBuilder()
    .setStateName(ACTIONS_STATES.WAITING_FOR_CARD_SELECTION)
    .selectRound(ROUND_ID)
    .selectPlayer(USER_ID_1)
    .build();

  const gameActor = new WaitingForCardSelection(state, settings);

  const nextState = gameActor.selectQuestion({
    playerId: USER_ID_1,
    questionId: QUESTION_ID,
    timestamp,
  }).gameState;

  const ACTUAL_VALUE = {
    stateName: nextState.stateName,
    selectedQuestionId: nextState.selectedQuestionId,
    cardSelectionAt: nextState.cardSelectionAt,
  };

  const EXPECTED_VALUE = {
    stateName: ACTIONS_STATES.WAITING_FOR_CAPTURE_QUESTION,
    selectedQuestionId: QUESTION_ID,
    cardSelectionAt: timestamp,
  };
  expect(ACTUAL_VALUE).toEqual(EXPECTED_VALUE);
});

test("test select already opened question", () => {
  const settings = new GameSettingsBuilder()
    .addUsers(USER_ID_1, USER_ID_2)
    .setCreatorId(USER_ID_1)
    .addRound({ id: ROUND_ID })
    .addTheme({ id: THEME_ID, roundId: ROUND_ID })
    .addQuestion({
      id: QUESTION_ID,
      answer: QUESTION_ANSWER,
      themeId: THEME_ID,
    })
    .addQuestion({
      id: QUESTION_ID_2,
      answer: QUESTION_ANSWER,
      themeId: THEME_ID,
    })
    .build();

  const state = new GameStateBuilder()
    .setStateName(ACTIONS_STATES.WAITING_FOR_CARD_SELECTION)
    .closeQuestion(QUESTION_ID)
    .selectRound(ROUND_ID)
    .selectPlayer(USER_ID_1)
    .build();

  const gameActor = new WaitingForCardSelection(state, settings);

  const nextStateCall = () =>
    gameActor.selectQuestion({
      playerId: USER_ID_1,
      questionId: QUESTION_ID,
    });

  expect(nextStateCall).toThrow();
});

test("test select question by other player", () => {
  const settings = new GameSettingsBuilder()
    .addUsers(USER_ID_1, USER_ID_2)
    .setCreatorId(USER_ID_1)
    .addRound({ id: ROUND_ID })
    .addTheme({ id: THEME_ID, roundId: ROUND_ID })
    .addQuestion({
      id: QUESTION_ID,
      answer: QUESTION_ANSWER,
      themeId: THEME_ID,
    })
    .build();

  const state = new GameStateBuilder()
    .setStateName(ACTIONS_STATES.WAITING_FOR_CARD_SELECTION)
    .selectRound(ROUND_ID)
    .selectPlayer(USER_ID_1)
    .build();

  const gameActor = new WaitingForCardSelection(state, settings);

  const nextStateCall = () =>
    gameActor.selectQuestion({
      playerId: USER_ID_2,
      questionId: QUESTION_ID,
    });

  expect(nextStateCall).toThrow();
});
