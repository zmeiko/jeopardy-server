import { answer, captureQuestion, selectQuestion } from "../actions";
import { concatAllQuestionInRound } from "../states/helper";
import { ACTIONS_STATES } from "../states/states.const";
import GameSettingsBuilder from "../utils/SettingsBuilder";
import GameStateBuilder from "../utils/StateBuilder";

test("test finish game after open all cards", () => {
  const USER_ID_1 = 1;
  const USER_ID_2 = 2;

  const settings = new GameSettingsBuilder()
    .addUsers(USER_ID_1, USER_ID_2)
    .setCreatorId(USER_ID_1)
    .build();

  let state = new GameStateBuilder()
    .setStateName(ACTIONS_STATES.WAITING_FOR_CARD_SELECTION)
    .selectRound(settings.rounds[0].id)
    .selectPlayer(USER_ID_1)
    .build();

  const allQuestions = concatAllQuestionInRound(settings.rounds[0]);

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
