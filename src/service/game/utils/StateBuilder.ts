import { GameStatePayload, PlayerScore } from "../Game.types";
import { updateScore } from "../states/helper";
import { CreateEventPayload, GameEvent } from "../types";
import { createEvent } from "./Events.utils";

class GameStateBuilder {
  private stateName?: string;
  private currentRoundId?: number;
  private currentPlayerId: number | null;
  private selectedQuestionId: number | null;
  private answeringPlayerId: number | null;
  private answeredPlayerIds: number[];
  private cardSelectionAt: Date | null;
  private questionCaptureAt: Date | null;
  private openedQuestionsIds: number[];
  private playerScores: PlayerScore[]; //userId-score
  private events: GameEvent[];

  constructor(baseState?: Partial<GameStatePayload>) {
    this.stateName = baseState?.stateName;
    this.currentRoundId = baseState?.currentRoundId;
    this.currentPlayerId = baseState?.currentPlayerId ?? null;
    this.selectedQuestionId = baseState?.selectedQuestionId ?? null;
    this.answeringPlayerId = baseState?.answeringPlayerId ?? null;
    this.answeredPlayerIds = baseState?.answeredPlayerIds ?? [];
    this.cardSelectionAt = baseState?.cardSelectionAt ?? null;
    this.questionCaptureAt = baseState?.questionCaptureAt ?? null;
    this.openedQuestionsIds = baseState?.openedQuestionsIds ?? [];
    this.playerScores = baseState?.playerScores ?? [];
    this.events = baseState?.events ?? [];
  }

  public setStateName(name: string) {
    this.stateName = name;
    return this;
  }

  public updateScore(payload: {
    playerId: number;
    scoreDelta: number;
  }): GameStateBuilder {
    const { playerId, scoreDelta } = payload;

    this.playerScores = updateScore(this.playerScores, {
      playerId,
      score: scoreDelta,
    });
    return this;
  }

  public markPlayerAsAnswered(playerId: number) {
    const nextPlayerId = playerId;

    if (nextPlayerId) {
      const nextAnsweredPlayerIds = [...this.answeredPlayerIds, nextPlayerId];
      this.answeringPlayerId = null;
      this.answeredPlayerIds = nextAnsweredPlayerIds;
    }
    return this;
  }

  public closeQuestion(questionId: number) {
    const nextOpenedQuestionIds = [...this.openedQuestionsIds, questionId];
    this.answeredPlayerIds = [];
    this.answeringPlayerId = null;
    this.selectedQuestionId = null;
    this.openedQuestionsIds = nextOpenedQuestionIds;
    return this;
  }

  public reselectCard(timestamp?: Date) {
    this.cardSelectionAt = timestamp ?? new Date();
    return this;
  }

  public selectPlayer(playerId: number) {
    this.currentPlayerId = playerId;
    return this;
  }

  public selectRound(roundId: number) {
    this.currentRoundId = roundId;
    return this;
  }

  public selectQuestion(payload: { questionId: number; timestamp?: Date }) {
    const { questionId, timestamp } = payload;
    this.selectedQuestionId = questionId;
    this.cardSelectionAt = timestamp ?? new Date();
    return this;
  }

  public addEvent(payload: CreateEventPayload & { duration: number }) {
    this.events = [...this.events, createEvent(payload)];
    return this;
  }

  public build(): GameStatePayload {
    if (this.stateName === undefined) {
      throw new Error("State name should be defined");
    }

    if (this.currentRoundId === undefined) {
      throw new Error("Current round id should be defined");
    }

    return {
      stateName: this.stateName,

      currentRoundId: this.currentRoundId,

      currentPlayerId: this.currentPlayerId,
      selectedQuestionId: this.selectedQuestionId,

      answeringPlayerId: this.answeringPlayerId,
      answeredPlayerIds: this.answeredPlayerIds,

      cardSelectionAt: this.cardSelectionAt,
      questionCaptureAt: this.questionCaptureAt,

      openedQuestionsIds: this.openedQuestionsIds,
      playerScores: this.playerScores,
      events: this.events,
    };
  }
}

export default GameStateBuilder;
