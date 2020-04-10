import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import { ACTIONS_STATES } from "./states.const";

export class FinishUserState implements GameState {
  readonly statePayload: GameStatePayload;

  constructor(state: GameStatePayload, gameSettings: GameSettings) {
    this.statePayload = {
      stateName: ACTIONS_STATES.FINISH_GAME,
      ...state,
    };
  }

  tick(): GameState {
    return this;
  }

  answer(payload: { userId: number; answer: string }): GameState {
    throw new Error("Game has already finished");
  }

  captureQuestion(payload: { userId: number }): GameState {
    throw new Error("Game has already finished");
  }

  finish(payload: { force: boolean }): GameState {
    throw new Error("Game has already finished");
  }

  selectCard(payload: { userId: number; cardId: number }): GameState {
    throw new Error("Game has already finished");
  }

  selectUser(payload: { userId: number }): GameState {
    throw new Error("Game has already finished");
  }

  start(): GameState {
    throw new Error("Game has already finished");
  }
}
