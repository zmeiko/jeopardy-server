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

  selectFirstUser(payload: { userId: number }): GameState {
    const { userId } = payload;
    return new WaitingForCardSelection(
      {
        ...this.gameState,
        currentPlayerId: userId,
      },
      this.gameSettings
    );
  }
}
