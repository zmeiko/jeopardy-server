import { GameState, GameStatePayload } from "controllers/Game/Game.types";
import { ACTIONS_STATES } from "./states/states.const";
import { FinishUserState } from "./states/FinishUserState";
import { WaitingForFirstPlayerSelectionState } from "./states/WaitingForFirstPlayerSelectionState";

function getStateActor(statePayload: GameStatePayload): GameState {
  switch (statePayload.stateName) {
    case ACTIONS_STATES.WAITING_FOR_FIRST_USER:
      return new WaitingForFirstPlayerSelectionState();
    case ACTIONS_STATES.FINISH_GAME:
      return new FinishUserState(statePayload);
    default:
      throw new Error("Unknown state");
  }
}

export function createGame(): GameStatePayload {
  return new WaitingForFirstPlayerSelectionState().statePayload;
}

export function selectFirstPlayer(
  payload: {
    userId: number;
  },
  gameState: GameStatePayload
): GameStatePayload {
  const state = getStateActor(gameState);
  return state.selectUser(payload).statePayload;
}
