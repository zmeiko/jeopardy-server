import { GameQuestion, GameRound, GameTheme } from "../Game.types";

function generateNumberArray(n: number) {
  return Array.from(new Array(n), (_, i) => i);
}

export function generateQuestion(id: number): GameQuestion {
  return {
    id: id,
    answer: "yes",
    price: 100,
    scenario: `Question #${id}`,
  };
}

export function generateTheme(payload: {
  roundIndex: number;
  questionCount: number;
}): GameTheme {
  const { questionCount, roundIndex } = payload;
  const questions = generateNumberArray(questionCount).map((questionIndex) =>
    generateQuestion(roundIndex * 10000 + questionIndex)
  );
  return {
    questions,
  };
}

export function generateRounds(payload?: {
  roundCount?: number;
  themeCount?: number;
  questionCountInRound?: number;
}): GameRound[] {
  const { questionCountInRound = 5, roundCount = 1, themeCount = 3 } =
    payload || {};
  return generateNumberArray(roundCount).map((roundIndex) => ({
    id: roundIndex,
    name: `Round ${roundIndex}`,
    themes: generateNumberArray(themeCount).map((roundIndex: number) =>
      generateTheme({ roundIndex, questionCount: questionCountInRound })
    ),
  }));
}
