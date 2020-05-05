import {
  GameQuestion,
  GameRound,
  GameSettings,
  GameTheme,
} from "../Game.types";
import { DEFAULT_SETTINGS } from "../Game.const";

function generateNumberArray(n: number) {
  return Array.from(new Array(n), (_, i) => i);
}

function generateQuestion(id: number): GameQuestion {
  return {
    id: id,
    answer: "yes",
    price: 100,
    title: `Question #${id}`,
  };
}

function generateTheme(payload: {
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

function generateRounds(payload?: {
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

class GameSettingsBuilder {
  private themeCount = 1;
  private roundCount = 1;
  private questionsCount = 1;
  private userIds = [];
  private creatorId: number;

  constructor() {
    return this;
  }

  setThemeCount(count: number) {
    this.themeCount = count;
    return this;
  }

  setRoundCount(count: number) {
    this.roundCount = count;
    return this;
  }

  setQuestionCount(count: number) {
    this.questionsCount = count;
    return this;
  }

  addUsers(...ids: number[]) {
    this.userIds.push(...ids);
    return this;
  }

  setCreatorId(id: number) {
    this.creatorId = id;
    return this;
  }

  build(): GameSettings {
    const rounds = generateRounds({
      questionCountInRound: this.questionsCount,
      roundCount: this.roundCount,
      themeCount: this.themeCount,
    });
    return {
      playerIds: this.userIds,
      rounds,
      captureTimeoutMs: DEFAULT_SETTINGS.CAPTURE_TIMEOUT,
      answerTimeoutMs: DEFAULT_SETTINGS.ANSWER_TIMEOUT,
      creatorPlayerId: this.creatorId,
    };
  }
}

export default GameSettingsBuilder;
