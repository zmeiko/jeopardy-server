import { DEFAULT_SETTINGS } from "../Game.const";
import {
  GameRound,
  GameSettings,
  GameStatePayload,
  PlayerScore,
} from "../Game.types";
import { ACTIONS_STATES } from "../states/states.const";

function createScores(playerIds: number[]): PlayerScore[] {
  return playerIds.map((id) => ({
    playerId: id,
    score: 0,
  }));
}

export function createGameSettings(payload: {
  rounds: GameRound[];
  creatorPlayerId: number;
  playerIds: number[];
  captureTimeoutMs?: number;
}) {
  const {
    captureTimeoutMs = DEFAULT_SETTINGS.ANSWER_TIMEOUT,
    creatorPlayerId,
    playerIds,
    rounds,
  } = payload;
  return {
    playerIds,
    rounds,
    captureTimeoutMs,
    creatorPlayerId,
  };
}

export function createInitialState(payload: {
  playerIds: number[];
  firstRoundId: number;
}): GameStatePayload {
  const { playerIds, firstRoundId } = payload;
  return {
    stateName: ACTIONS_STATES.WAITING_FOR_FIRST_USER,
    currentRoundId: firstRoundId,
    currentPlayerId: null,
    selectedQuestionId: null,
    answeringPlayerId: null,
    cardSelectionAt: null,
    questionCaptureAt: null,
    openedQuestionsIds: [],
    answeredPlayerIds: [],
    playerScores: createScores(playerIds),
  };
}
