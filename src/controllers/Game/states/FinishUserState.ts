import { GameSettings, GameState, GameStatePayload } from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import { ACTIONS_STATES } from "./states.const";

export class FinishUserState extends BaseGameState {
  constructor(state: GameStatePayload, gameSettings: GameSettings) {
    super(
      {
        stateName: ACTIONS_STATES.FINISH_GAME,
        ...state,
      },
      gameSettings
    );
  }

  tick(): GameState {
    return this;
  }
}
