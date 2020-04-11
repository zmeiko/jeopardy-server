import { GameStateEntry } from "../entity/Game";
import { GameStatePayload } from "../service/Game";

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
