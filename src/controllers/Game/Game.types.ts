export interface GameQuestion {
  id: number;
  price: number;
  info?: {
    comment?: string;
  };
  scenario: string;
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
  creatorPlayerId: number;
  playerIds: number[];
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

  readonly playerScores: Map<number, number>; //userId-score
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
