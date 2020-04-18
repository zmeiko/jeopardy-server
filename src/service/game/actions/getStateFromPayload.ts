import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { FinishUserState } from "../states/FinishUserState";
import { ACTIONS_STATES } from "../states/states.const";
import { WaitingForAnswer } from "../states/WaitingForAnswer";
import { WaitingForCardSelection } from "../states/WaitingForCardSelection";
import { WaitingForFirstPlayerSelectionState } from "../states/WaitingForFirstPlayerSelectionState";
import { WaitingForQuestionCapture } from "../states/WaitingForQuestionCapture";

export default function getStateFromPayload(
  statePayload: GameStatePayload,
  gameSettings: GameSettings
): GameState {
  switch (statePayload.stateName) {
    case ACTIONS_STATES.WAITING_FOR_FIRST_USER:
      return new WaitingForFirstPlayerSelectionState(
        statePayload,
        gameSettings
      );
    case ACTIONS_STATES.FINISH_GAME:
      return new FinishUserState(statePayload, gameSettings);
    case ACTIONS_STATES.WAITING_FOR_CARD_SELECTION:
      return new WaitingForCardSelection(statePayload, gameSettings);
    case ACTIONS_STATES.WAITING_FOR_CAPTURE_QUESTION:
      return new WaitingForQuestionCapture(statePayload, gameSettings);
    case ACTIONS_STATES.WAITING_FOR_USER_ANSWER:
      return new WaitingForAnswer(statePayload, gameSettings);
    default:
      throw new Error(`Unknown state - ${statePayload.stateName}`);
  }
}
