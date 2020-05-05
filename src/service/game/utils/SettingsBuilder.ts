import { GameRound, GameSettings } from "../Game.types";
import { DEFAULT_SETTINGS } from "../Game.const";

function findThemeInRound(rounds: GameRound[], themeId: number) {
  for (const round of rounds) {
    for (const theme of round.themes) {
      if (theme.id === themeId) {
        return theme;
      }
    }
  }
}

class GameSettingsBuilder {
  private rounds: GameRound[] = [];
  private playerIds: number[] = [];
  private creatorPlayerId?: number;

  constructor(base?: Partial<GameSettings>) {
    this.playerIds = base?.playerIds ?? [];
    this.creatorPlayerId = base?.creatorPlayerId;
    return this;
  }

  addRound(payload: { id: number; name?: string }) {
    const { id, name = "" } = payload;
    this.rounds.push({ id, name, themes: [] });
    return this;
  }

  addTheme(payload: { id: number; name?: string; roundId: number }) {
    const { id, roundId, name = "" } = payload;
    const round = this.rounds.find(({ id }) => id === roundId);
    if (!round) {
      throw new Error(`Round with id = ${roundId} not found`);
    }
    round.themes.push({ id, questions: [] });
    return this;
  }

  addQuestion(payload: {
    id: number;
    answer: string;
    title?: string;
    type?: string;
    price?: number;
    themeId: number;
  }) {
    const { id, price = 100, answer, title = "", themeId } = payload;
    const theme = findThemeInRound(this.rounds, themeId);
    if (!theme) {
      throw new Error(`Theme with id = ${themeId} not found`);
    }
    theme.questions.push({
      title,
      answer,
      id,
      price,
    });
    return this;
  }

  addUsers(...ids: number[]) {
    this.playerIds.push(...ids);
    return this;
  }

  setCreatorId(id: number) {
    this.creatorPlayerId = id;
    return this;
  }

  build(): GameSettings {
    if (!this.creatorPlayerId) {
      throw Error("Creator player id should be defined");
    }

    return {
      playerIds: this.playerIds,
      rounds: this.rounds,
      captureTimeoutMs: DEFAULT_SETTINGS.CAPTURE_TIMEOUT,
      answerTimeoutMs: DEFAULT_SETTINGS.ANSWER_TIMEOUT,
      creatorPlayerId: this.creatorPlayerId,
    };
  }
}

export default GameSettingsBuilder;
