import {
  GameQuestion,
  GameRound,
  GameSettings,
  PlayerScore,
} from "../Game.types";

export function updateScore(
  scores: PlayerScore[],
  payload: { playerId: number; score: number }
): PlayerScore[] {
  const { score, playerId } = payload;
  const scoreObject = scores.find((item) => (item.playerId = playerId));
  if (!scoreObject) {
    throw new Error(`User with id = ${playerId} hasn't scores`);
  }
  return [
    ...scores,
    {
      ...scoreObject,
      score: scoreObject.score + score,
    },
  ];
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
