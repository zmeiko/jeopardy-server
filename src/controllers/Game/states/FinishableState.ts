import { GameStatePayload } from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import { FinishUserState } from "./FinishUserState";
import { concatAllQuestionInRound, findRound } from "./state.utils";
import { WaitingForCardSelection } from "./WaitingForCardSelection";

export class FinishableState extends BaseGameState {
  protected roundWillFinish() {
    const { currentRoundId, openedQuestionsIds } = this.gameState;
    const currentRound = findRound(this.gameSettings, currentRoundId);
    if (!currentRound) {
      throw new Error(`Round with id = ${currentRoundId} not found`);
    }
    const questions = concatAllQuestionInRound(currentRound);
    return questions.length <= openedQuestionsIds.length + 1;
  }

  protected nextRound(nextStatePayload: GameStatePayload) {
    const { currentRoundId } = this.gameState;
    const { rounds } = this.gameSettings;
    const currentRoundIndex = rounds.findIndex(
      (round) => round.id === currentRoundId
    );
    if (currentRoundIndex === rounds.length - 1) {
      return new FinishUserState(nextStatePayload, this.gameSettings);
    } else {
      const nextRoundId = rounds[currentRoundIndex + 1].id;
      return new WaitingForCardSelection(
        { ...nextStatePayload, currentRoundId: nextRoundId },
        this.gameSettings
      );
    }
  }
}
