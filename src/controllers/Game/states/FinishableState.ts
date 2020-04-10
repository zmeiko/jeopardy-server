import { GameStatePayload } from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import { concatAllQuestionInRound, findRound } from "./state.utils";
import { WaitingForCardSelection } from "./WaitingForCardSelection";

export abstract class FinishableState extends BaseGameState {
  protected roundWillFinish() {
    const { currentRoundId, openedQuestionsIds } = this.statePayload;
    const currentRound = findRound(this.gameSettings, currentRoundId);
    if (!currentRound) {
      throw new Error(`Round with id = ${currentRoundId} not found`);
    }
    const questions = concatAllQuestionInRound(currentRound);
    return questions.length === openedQuestionsIds.length - 1;
  }

  protected nextRound(nextStatePayload: GameStatePayload) {
    return new WaitingForCardSelection(
      { ...nextStatePayload },
      this.gameSettings
    );
  }
}
