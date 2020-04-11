import { GameSettings, GameStatePayload } from "../Game.types";
import getStateFromPayload from "./getStateFromPayload";

export function selectFirstPlayer(
  payload: {
    userId: number;
  },
  gameState: GameStatePayload,
  gameSettings: GameSettings
): GameStatePayload {
  const state = getStateFromPayload(gameState, gameSettings);
  return state.selectFirstUser(payload).gameState;
}

export function selectQuestion(
  payload: {
    userId: number;
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
    userId: number;
  },
  gameState: GameStatePayload,
  gameSettings: GameSettings
): GameStatePayload {
  const state = getStateFromPayload(gameState, gameSettings);
  return state.captureQuestion(payload).gameState;
}

export function answer(
  payload: {
    userId: number;
    answer: string;
  },
  gameState: GameStatePayload,
  gameSettings: GameSettings
): GameStatePayload {
  const state = getStateFromPayload(gameState, gameSettings);
  return state.answer(payload).gameState;
}
