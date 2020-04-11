import { GameSettings, GameState, GameStatePayload } from "../Game.types";

export class BaseGameState implements GameState {
  public readonly gameState: GameStatePayload;
  protected readonly gameSettings: GameSettings;

  constructor(gameState: GameStatePayload, gameSettings: GameSettings) {
    this.gameState = gameState;
    this.gameSettings = gameSettings;
  }

  tick(payload: { timestamp?: Date }): GameState {
    return this;
  }

  answer(payload: {
    playerId: number;
    answer: string;
    timestamp?: Date;
  }): GameState {
    throw new Error("Invalid state");
  }

  captureQuestion(payload: { playerId: number; timestamp?: Date }): GameState {
    throw new Error("Invalid state");
  }

  selectQuestion(payload: {
    playerId: number;
    questionId: number;
    timestamp?: Date;
  }): GameState {
    throw new Error("Invalid state");
  }

  selectFirstPlayer(payload: { playerId: number }): GameState {
    throw new Error("Invalid state");
  }
}
