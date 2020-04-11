import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import { ACTIONS_STATES } from "./states.const";
import { WaitingForCardSelection } from "./WaitingForCardSelection";

export class WaitingForFirstPlayerSelectionState extends BaseGameState {
  constructor(statePayload: GameStatePayload, gameSettings: GameSettings) {
    super(
      {
        ...statePayload,
        stateName: ACTIONS_STATES.WAITING_FOR_FIRST_USER,
      },
      gameSettings
    );
  }

  selectFirstPlayer(payload: { playerId: number }): GameState {
    const { playerId } = payload;
    return new WaitingForCardSelection(
      {
        ...this.gameState,
        currentPlayerId: playerId,
      },
      this.gameSettings
    );
  }
}
