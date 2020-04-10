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
  return state.selectUser(payload).statePayload;
}
