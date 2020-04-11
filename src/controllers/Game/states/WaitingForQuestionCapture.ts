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

  captureQuestion(payload: { userId: number; timestamp?: Date }): GameState {
    const { userId, timestamp = new Date() } = payload;

    if (this.timeIsOver(timestamp)) {
      return this.waitNextCard();
    }
    return new WaitingForAnswer(
      {
        ...this.gameState,
        answeringUserId: userId,
        questionCaptureAt: new Date(),
      },
      this.gameSettings
    );
  }

  tick(payload: { timestamp?: Date }): GameState {
    const { timestamp } = payload;
    if (!this.timeIsOver(timestamp)) {
      return this.waitNextCard();
    }
    return this;
  }

  private waitNextCard(): GameState {
    const { openedQuestionsIds, selectedQuestionId } = this.gameState;
    const newOpenedCardIds = [...openedQuestionsIds, selectedQuestionId];

    if (this.roundWillFinish()) {
      return this.nextRound({
        ...this.gameState,
        openedQuestionsIds: newOpenedCardIds,
      });
    } else {
      return new WaitingForCardSelection(
        {
          ...this.gameState,
          openedQuestionsIds: newOpenedCardIds,
        },
        this.gameSettings
      );
    }
  }

  private timeIsOver(timestamp: Date): boolean {
    const now = timestamp.getTime();
    return (
      this.gameState.cardSelectionAt?.getTime() +
        this.gameSettings.captureTimeoutMs >
      now
    );
  }
}
