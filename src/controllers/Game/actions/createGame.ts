import { DEFAULT_SETTINGS } from "../Game.const";
import { GameRound, GameSettings, GameStatePayload } from "../Game.types";
import { WaitingForFirstPlayerSelectionState } from "../states/WaitingForFirstPlayerSelectionState";

function createEmptyScoreMap(userIds: number[]) {
  const mapScore = new Map<number, number>();
  userIds.forEach((id) => mapScore.set(id, 0));
  return mapScore;
}

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
      currentRoundId: rounds[0].id,
      currentPlayerId: null,
      selectedQuestionId: null,
      answeringPlayerId: null,
      cardSelectionAt: null,
      questionCaptureAt: null,
      openedQuestionsIds: [],
      answeredPlayerIds: [],
      playerScores: createEmptyScoreMap(playerIds),
    },
    gameSettings
  ).gameState;

  return { settings: gameSettings, state: gameState };
}
