import { DEFAULT_SETTINGS } from "../Game.const";
import { GameRound, GameSettings, GameStatePayload } from "../Game.types";
import { WaitingForFirstPlayerSelectionState } from "../states/WaitingForFirstPlayerSelectionState";

export function createGame(payload: {
  rounds: GameRound[];
  creatorPlayerId: number;
  playerIds: number[];
  captureTimeoutMs?: number;
}): { settings: GameSettings; state: GameStatePayload } {
  const {
    captureTimeoutMs = DEFAULT_SETTINGS.ANSWER_TIMEOUT,
    creatorPlayerId,
    playerIds,
    rounds,
  } = payload;
  const gameSettings: GameSettings = {
    playerIds,
    rounds,
    captureTimeoutMs,
    creatorPlayerId,
  };
  const gameState = new WaitingForFirstPlayerSelectionState(
    {
      stateName: "",
      currentRoundId: 1,
      currentPlayerId: null,
      selectedQuestionId: null,
      answeringUserId: null,
      cardSelectionAt: null,
      questionCaptureAt: null,
      openedQuestionsIds: [],
      answeredPlayerIds: [],
      playerScore: new Map<number, number>(),
    },
    gameSettings
  ).statePayload;

  return { settings: gameSettings, state: gameState };
}
