import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import GameStateBuilder from "../utils/StateBuilder";
import { BaseGameState } from "./BaseGameState";
import { ACTIONS_STATES } from "./states.const";
import { WaitingForQuestionCapture } from "./WaitingForQuestionCapture";

export class WaitingForCardSelection extends BaseGameState {
  constructor(statePayload: GameStatePayload, gameSettings: GameSettings) {
    super(
      {
        ...statePayload,
        stateName: ACTIONS_STATES.WAITING_FOR_CARD_SELECTION,
      },
      gameSettings
    );
  }

  selectQuestion(payload: {
    playerId: number;
    questionId: number;
    timestamp?: Date;
  }): GameState {
    const { questionId, playerId, timestamp = new Date() } = payload;
    const { currentPlayerId, openedQuestionsIds } = this.gameState;
    if (currentPlayerId !== playerId) {
      throw new Error(`Only user with id ${currentPlayerId} can select card`);
    }

    if (openedQuestionsIds.includes(questionId)) {
      throw new Error("Question already have opened");
    }

    const nextState = new GameStateBuilder(this.gameState)
      .selectQuestion({
        questionId,
        timestamp,
      })
      .build();

    return new WaitingForQuestionCapture(nextState, this.gameSettings);
  }
}
