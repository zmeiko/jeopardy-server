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

  readonly answeringUserId: number | null;
  readonly answeredPlayerIds: number[];

  readonly cardSelectionAt: Date | null;
  readonly questionCaptureAt?: Date | null;

  readonly openedQuestionsIds: number[];

  readonly playerScore: Map<number, number>; //userId-score
}

export interface GameState {
  readonly statePayload: GameStatePayload;
  start(): GameState;
  selectUser(payload: { userId: number }): GameState;
  selectCard(payload: { userId: number; cardId: number }): GameState;
  captureQuestion(payload: { userId: number }): GameState;
  answer(payload: { userId: number; answer: string }): GameState;
  finish(payload: { force: boolean }): GameState;

  tick(): GameState;
}
