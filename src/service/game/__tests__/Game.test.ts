import { answer, captureQuestion, selectQuestion } from "../actions";
import { ACTIONS_STATES } from "../states/states.const";
import GameSettingsBuilder from "../utils/SettingsBuilder";
import GameStateBuilder from "../utils/StateBuilder";

test("test finish game after open all cards", () => {
  const USER_ID_1 = 1;
  const USER_ID_2 = 2;

  const ROUND_ID = 1;
  const THEME_ID = 1;
  const QUESTION_ID = 1;
  const QUESTION_ANSWER = "yes";

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

  let state = new GameStateBuilder()
    .setStateName(ACTIONS_STATES.WAITING_FOR_CARD_SELECTION)
    .selectRound(ROUND_ID)
    .selectPlayer(USER_ID_1)
    .build();

  state = selectQuestion(
    { playerId: USER_ID_1, questionId: QUESTION_ID },
    state,
    settings
  );
  state = captureQuestion({ playerId: USER_ID_1 }, state, settings);
  state = answer(
    { playerId: USER_ID_1, answer: QUESTION_ANSWER },
    state,
    settings
  );
  expect(state.stateName).toEqual(ACTIONS_STATES.FINISH_GAME);
});
