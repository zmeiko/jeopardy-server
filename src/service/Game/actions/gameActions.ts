import { GameSettings, GameStatePayload } from "../Game.types";
import getStateFromPayload from "./getStateFromPayload";

export function selectFirstPlayer(
  payload: {
    playerId: number;
  },
  gameState: GameStatePayload,
  gameSettings: GameSettings
): GameStatePayload {
  const state = getStateFromPayload(gameState, gameSettings);
  return state.selectFirstPlayer(payload).gameState;
}

export function selectQuestion(
  payload: {
    playerId: number;
    questionId: number;
  },
  gameState: GameStatePayload,
  gameSettings: GameSettings
): GameStatePayload {
  const state = getStateFromPayload(gameState, gameSettings);
  return state.selectQuestion(payload).gameState;
}

export function captureQuestion(
  payload: {
    playerId: number;
  },
  gameState: GameStatePayload,
  gameSettings: GameSettings
): GameStatePayload {
  const state = getStateFromPayload(gameState, gameSettings);
  return state.captureQuestion(payload).gameState;
}

export function answer(
  payload: {
    playerId: number;
    answer: string;
  },
  gameState: GameStatePayload,
  gameSettings: GameSettings
): GameStatePayload {
  const state = getStateFromPayload(gameState, gameSettings);
  return state.answer(payload).gameState;
}
