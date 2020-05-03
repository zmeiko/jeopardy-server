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
  answerTimeoutMs?: number;
}): GameSettings {
  const {
    captureTimeoutMs = DEFAULT_SETTINGS.CAPTURE_TIMEOUT,
    answerTimeoutMs = DEFAULT_SETTINGS.ANSWER_TIMEOUT,
    creatorPlayerId,
    playerIds,
    rounds,
  } = payload;
  return {
    playerIds,
    rounds,
    captureTimeoutMs,
    answerTimeoutMs,
    creatorPlayerId,
  };
}

export function createInitialState(payload: {
  playerIds: number[];
  firstRoundId: number;
}): GameStatePayload {
  const { playerIds, firstRoundId } = payload;
  const firstPlayerId = playerIds[0];
  return {
    stateName: ACTIONS_STATES.WAITING_FOR_CARD_SELECTION,
    currentRoundId: firstRoundId,
    currentPlayerId: firstPlayerId,
    selectedQuestionId: null,
    answeringPlayerId: null,
    cardSelectionAt: null,
    questionCaptureAt: null,
    openedQuestionsIds: [],
    answeredPlayerIds: [],
    playerScores: createScores(playerIds),
    events: [],
  };
}
