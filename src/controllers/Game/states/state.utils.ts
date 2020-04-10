import { GameQuestion, GameRound, GameSettings } from "../Game.types";

export function updateScore(
  scoreMap: Map<number, number>,
  payload: { userId: number; score: number }
) {
  // todo: replace with copy;
  const { score, userId } = payload;
  if (!scoreMap.has(userId)) {
    throw new Error(`User with id = ${userId} hasn't scores`);
  }
  const currentScore = scoreMap.get(userId)!;
  const newScore = currentScore + score;
  scoreMap.set(userId, newScore);
  return scoreMap;
}

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
