import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import { getNextRoundOrFinishState, roundWillFinish } from "./helper";
import { ACTIONS_STATES } from "./states.const";
import { WaitingForAnswer } from "./WaitingForAnswer";
import { WaitingForCardSelection } from "./WaitingForCardSelection";
import GameStateBuilder from "../utils/StateBuilder";

export class WaitingForQuestionCapture extends BaseGameState {
  constructor(statePayload: GameStatePayload, gameSettings: GameSettings) {
    super(
      {
        ...statePayload,
        stateName: ACTIONS_STATES.WAITING_FOR_CAPTURE_QUESTION,
      },
      gameSettings
    );
  }

  captureQuestion(payload: { playerId: number; timestamp?: Date }): GameState {
    const { playerId, timestamp = new Date() } = payload;

    if (this.timeIsOver(timestamp)) {
      return this.waitNextCard();
    }
    return new WaitingForAnswer(
      {
        ...this.gameState,
        answeringPlayerId: playerId,
        questionCaptureAt: timestamp,
      },
      this.gameSettings
    );
  }

  tick(payload: { timestamp?: Date }): GameState {
    const { timestamp = new Date() } = payload;
    if (this.timeIsOver(timestamp)) {
      return this.waitNextCard();
    }
    return this;
  }

  private waitNextCard(): GameState {
    const { selectedQuestionId } = this.gameState;

    const nextGameState = new GameStateBuilder(this.gameState)
      .closeQuestion(selectedQuestionId!)
      .build();

    if (roundWillFinish(nextGameState, this.gameSettings)) {
      return getNextRoundOrFinishState(nextGameState, this.gameSettings);
    } else {
      return new WaitingForCardSelection(nextGameState, this.gameSettings);
    }
  }

  private timeIsOver(timestamp: Date): boolean {
    const now = timestamp.getTime();
    const selectedTimestamp = this.gameState.cardSelectionAt?.getTime();
    if (!selectedTimestamp) {
      return true;
    }
    return selectedTimestamp + this.gameSettings.captureTimeoutMs < now;
  }
}
