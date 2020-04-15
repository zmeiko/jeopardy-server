import { GameEntity, GameStateEntry } from "../entity/Game";
import { QuizEntity } from "../entity/Quiz";
import { User } from "../entity/User";
import {
  DEFAULT_SETTINGS,
  GameSettings,
  GameStatePayload,
} from "../service/Game";

export function serviceGameStateToEntryGameState(
  serviceState: GameStatePayload
): GameStateEntry {
  return {
    answeredPlayerIds: serviceState.answeredPlayerIds,
    answeringPlayerId: serviceState.answeringPlayerId,
    cardSelectionAt: serviceState.cardSelectionAt,
    currentPlayerId: serviceState.currentPlayerId,
    currentRoundId: serviceState.currentRoundId,
    openedQuestionsIds: serviceState.openedQuestionsIds,
    playerScores: serviceState.playerScores,
    questionCaptureAt: serviceState.questionCaptureAt,
    selectedQuestionId: serviceState.selectedQuestionId,
    stateName: serviceState.stateName,
  };
}

export function entryGameStateToServiceGameState(
  entryGameState: GameStateEntry
): GameStatePayload {
  return {
    answeredPlayerIds: entryGameState.answeredPlayerIds,
    answeringPlayerId: entryGameState.answeringPlayerId,
    cardSelectionAt: entryGameState.cardSelectionAt
      ? new Date(entryGameState.cardSelectionAt)
      : null,
    currentPlayerId: entryGameState.currentPlayerId,
    currentRoundId: entryGameState.currentRoundId,
    openedQuestionsIds: entryGameState.openedQuestionsIds,
    playerScores: entryGameState.playerScores,
    questionCaptureAt: entryGameState.questionCaptureAt
      ? new Date(entryGameState.questionCaptureAt)
      : null,
    selectedQuestionId: entryGameState.selectedQuestionId,
    stateName: entryGameState.stateName,
  };
}

export function extractGameSettingsFromEntry(payload: {
  game: GameEntity;
  quiz: QuizEntity;
  players: User[];
}): GameSettings {
  const { game, players, quiz } = payload;
  return {
    rounds: quiz.rounds,
    playerIds: players.map(({ id }) => id),
    creatorPlayerId: game.creatorUserId,
    captureTimeoutMs: DEFAULT_SETTINGS.ANSWER_TIMEOUT,
  };
}
