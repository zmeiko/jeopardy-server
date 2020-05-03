import {
  GameQuestion,
  GameRound,
  GameSettings,
  GameStatePayload,
  PlayerScore,
} from "../Game.types";
import { GameEvent } from "../types";
import { FinishUserState } from "./FinishUserState";
import { WaitingForCardSelection } from "./WaitingForCardSelection";

export function findRound(gameSettings: GameSettings, roundId: number) {
  return gameSettings.rounds.find((round) => round.id === roundId);
}

export function concatAllQuestionInRound(round: GameRound) {
  return round.themes.reduce(
    (allQuestions: GameQuestion[], theme) => [
      ...allQuestions,
      ...theme.questions,
    ],
    []
  );
}

export function roundWillFinish(
  gameState: GameStatePayload,
  gameSettings: GameSettings
) {
  const { currentRoundId, openedQuestionsIds } = gameState;
  const currentRound = findRound(gameSettings, currentRoundId);
  if (!currentRound) {
    throw new Error(`Round with id = ${currentRoundId} not found`);
  }
  const questions = concatAllQuestionInRound(currentRound);
  return questions.length <= openedQuestionsIds.length;
}

export function getNextRoundOrFinishState(
  nextStatePayload: GameStatePayload,
  gameSettings: GameSettings
) {
  const { currentRoundId } = nextStatePayload;
  const { rounds } = gameSettings;
  const currentRoundIndex = rounds.findIndex(
    (round) => round.id === currentRoundId
  );
  if (currentRoundIndex === rounds.length - 1) {
    return new FinishUserState(nextStatePayload, this.gameSettings);
  } else {
    const nextRoundId = rounds[currentRoundIndex + 1].id;
    return new WaitingForCardSelection(
      { ...nextStatePayload, currentRoundId: nextRoundId },
      this.gameSettings
    );
  }
}

export function updateScore(
  scores: PlayerScore[],
  payload: { playerId: number; score: number }
): PlayerScore[] {
  const { score, playerId } = payload;
  const scoreObject = scores.find((item) => (item.playerId = playerId));
  if (!scoreObject) {
    throw new Error(`User with id = ${playerId} hasn't scores`);
  }
  return scores.map((scoreObject) => {
    if (scoreObject.playerId === playerId) {
      return {
        ...scoreObject,
        score: scoreObject.score + score,
      };
    }
    return scoreObject;
  });
}
