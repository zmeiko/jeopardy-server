import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import { FinishableState } from "./FinishableState";
import { FinishUserState } from "./FinishUserState";
import { ACTIONS_STATES } from "./states.const";
import { WaitingForAnswer } from "./WaitingForAnswer";
import { WaitingForCardSelection } from "./WaitingForCardSelection";

export class WaitingForQuestionCapture extends FinishableState {
  constructor(statePayload: GameStatePayload, gameSettings: GameSettings) {
    super(
      {
        ...statePayload,
        stateName: ACTIONS_STATES.WAITING_FOR_CAPTURE_QUESTION,
      },
      gameSettings
    );
  }

  captureQuestion(payload: { userId: number }): GameState {
    const { userId } = payload;

    if (this.timeIsOver()) {
      return this.waitNextCard();
    }
    return new WaitingForAnswer(
      {
        ...this.statePayload,
        answeringUserId: userId,
        questionCaptureAt: new Date(),
      },
      this.gameSettings
    );
  }

  tick(): GameState {
    if (!this.timeIsOver()) {
      return this.waitNextCard();
    }
    return this;
  }

  private waitNextCard(): GameState {
    const { openedQuestionsIds, selectedQuestionId } = this.statePayload;
    const newOpenedCardIds = [...openedQuestionsIds, selectedQuestionId];

    if (this.roundWillFinish()) {
      return this.nextRound({
        ...this.statePayload,
        openedQuestionsIds: newOpenedCardIds,
      });
    } else {
      return new WaitingForCardSelection(
        {
          ...this.statePayload,
          openedQuestionsIds: newOpenedCardIds,
        },
        this.gameSettings
      );
    }
  }

  private timeIsOver(): boolean {
    const now = new Date().getTime();
    return (
      this.statePayload.cardSelectionAt?.getTime() +
        this.gameSettings.captureTimeoutMs >
      now
    );
  }
}
