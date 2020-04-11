import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { ACTIONS_STATES } from "./states.const";

export class FinishUserState implements GameState {
  readonly gameState: GameStatePayload;

  constructor(state: GameStatePayload, gameSettings: GameSettings) {
    this.gameState = {
      ...state,
      stateName: ACTIONS_STATES.FINISH_GAME,
    };
  }

  tick(payload: { timestamp?: Date }): GameState {
    return this;
  }

  answer(payload: {
    playerId: number;
    answer: string;
    timestamp?: Date;
  }): GameState {
    throw new Error("Game has already finished");
  }

  captureQuestion(payload: { playerId: number; timestamp?: Date }): GameState {
    throw new Error("Game has already finished");
  }

  selectQuestion(payload: {
    playerId: number;
    questionId: number;
    timestamp?: Date;
  }): GameState {
    throw new Error("Game has already finished");
  }

  selectFirstPlayer(payload: { playerId: number }): GameState {
    throw new Error("Game has already finished");
  }
}
