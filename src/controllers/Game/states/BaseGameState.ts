import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { FinishUserState } from "./FinishUserState";
import { concatAllQuestionInRound, findRound } from "./state.utils";
import { WaitingForCardSelection } from "./WaitingForCardSelection";

export class BaseGameState implements GameState {
  public readonly statePayload: GameStatePayload;
  protected readonly gameSettings: GameSettings;

  constructor(gameState: GameStatePayload, gameSettings: GameSettings) {
    this.statePayload = gameState;
    this.gameSettings = gameSettings;
  }

  tick(): GameState {
    return this;
  }

  answer(payload: { userId: number; answer: string }): GameState {
    throw new Error("Invalid state");
  }

  captureQuestion(payload: {
    userId: number;
    timeoutDurationMs: number;
  }): GameState {
    throw new Error("Invalid state");
  }

  finish(payload: { force: boolean }): GameState {
    if (payload.force) {
      return new FinishUserState(this.statePayload, this.gameSettings);
    }
    throw new Error("Invalid state");
  }

  selectCard(payload: { userId: number; cardId: number }): GameState {
    throw new Error("Invalid state");
  }

  selectUser(payload: { userId: number }): GameState {
    throw new Error("Invalid state");
  }

  start(): GameState {
    throw new Error("Invalid state");
  }
}
