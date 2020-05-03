import { GameEvent } from "./types";

export interface GameQuestion {
  id: number;
  price: number;
  info?: {
    comment?: string;
  };
  title: string;
  answer: string;
}

export interface GameTheme {
  questions: GameQuestion[];
}

export interface GameRound {
  id: number;
  name: string;
  themes: GameTheme[];
}

export interface GameSettings {
  rounds: GameRound[];
  captureTimeoutMs: number;
  answerTimeoutMs: number;
  creatorPlayerId: number;
  playerIds: number[];
}

export interface QuestionType {
  id?: number;
  title: string;
  price: number;
  answer: string;
  type: string;
}

export interface ThemeType {
  id?: number;
  name: string;
  questions: QuestionType[];
}

export interface RoundType {
  id?: number;
  name: string;
  themes: ThemeType[];
}

export interface QuizType {
  id?: number;
  name: string;
  rounds: RoundType[];
}

export interface PlayerScore {
  playerId: number;
  score: number;
}

export interface GameStatePayload {
  readonly stateName: string;

  readonly currentRoundId: number;

  readonly currentPlayerId: number | null;
  readonly selectedQuestionId: number | null;

  readonly answeringPlayerId: number | null;
  readonly answeredPlayerIds: number[];

  readonly cardSelectionAt: Date | null;
  readonly questionCaptureAt?: Date | null;

  readonly openedQuestionsIds: number[];

  readonly playerScores: PlayerScore[]; //userId-score
  readonly events: GameEvent[];
}

export interface GameState {
  readonly gameState: GameStatePayload;

  selectFirstPlayer(payload: { playerId: number }): GameState;

  selectQuestion(payload: {
    playerId: number;
    questionId: number;
    timestamp?: Date;
  }): GameState;

  captureQuestion(payload: { playerId: number; timestamp?: Date }): GameState;

  answer(payload: {
    playerId: number;
    answer: string;
    timestamp?: Date;
  }): GameState;

  tick(payload: { timestamp?: Date }): GameState;
}
