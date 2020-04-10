import { GameQuestion, GameRound, GameTheme } from "../Game.types";

function generateNumberArray(n: number) {
  return new Array(n).map((i) => i);
}

export function generateQuestion(): GameQuestion {
  const id = Math.random() * 1000000;
  return {
    id: id,
    answer: "yes",
    price: 100,
    scenario: `Question #${id}`,
  };
}

export function generateTheme(payload: { questionCount: number }): GameTheme {
  const questions = generateNumberArray(payload.questionCount).map(() =>
    generateQuestion()
  );
  return {
    questions,
  };
}

export function generateRounds(payload?: {
  roundCount?: number;
  themeCount?: number;
  questionCountInRound?: number;
  userCount?: number;
}): GameRound[] {
  const { questionCountInRound = 5, roundCount = 1, themeCount = 3 } =
    payload || {};
  return generateNumberArray(roundCount).map((roundIndex) => ({
    id: roundIndex,
    name: `Round ${roundIndex}`,
    themes: generateNumberArray(themeCount).map(() =>
      generateTheme({ questionCount: questionCountInRound })
    ),
  }));
}
