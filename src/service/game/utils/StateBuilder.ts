import { GameStatePayload } from "../Game.types";
import { updateScore } from "../states/helper";
import { CreateEventPayload } from "../types";
import { createEvent } from "./Events.utils";

class GameStateBuilder {
  state: GameStatePayload;
  constructor(baseState: GameStatePayload) {
    this.state = baseState;
    return this;
  }

  public updateScore(payload: {
    playerId?: number;
    scoreDelta: number;
  }): GameStateBuilder {
    const { playerId = this.state.answeringPlayerId, scoreDelta } = payload;
    const nextScore = updateScore(this.state.playerScores, {
      playerId,
      score: scoreDelta,
    });
    this.state = { ...this.state, playerScores: nextScore };
    return this;
  }

  public markPlayerAsAnswered(playerId: number = this.state.answeringPlayerId) {
    const nextAnsweredPlayer = [...this.state.answeredPlayerIds, playerId];
    this.state = {
      ...this.state,
      answeringPlayerId: null,
      answeredPlayerIds: nextAnsweredPlayer,
    };
    return this;
  }

  public closeQuestion(questionId: number = this.state.selectedQuestionId) {
    const { openedQuestionsIds, selectedQuestionId } = this.state;
    const nextOpenedQuestionIds = [...openedQuestionsIds, selectedQuestionId];
    this.state = {
      ...this.state,
      answeredPlayerIds: [],
      answeringPlayerId: null,
      selectedQuestionId: null,
      openedQuestionsIds: nextOpenedQuestionIds,
    };
    return this;
  }

  public reselectCard() {
    this.state = {
      ...this.state,
      cardSelectionAt: new Date(),
    };
    return this;
  }

  public selectPlayer(playerId: number = this.state.answeringPlayerId) {
    this.state = {
      ...this.state,
      currentPlayerId: playerId,
    };
    return this;
  }

  public selectQuestion(questionId: number) {
    this.state = {
      ...this.state,
      selectedQuestionId: questionId,
      cardSelectionAt: new Date(),
    };
    return this;
  }

  public addEvent(payload: CreateEventPayload & { duration: number }) {
    const nextEvents = [...this.state.events, createEvent(payload)];
    this.state = {
      ...this.state,
      events: nextEvents,
    };
    return this;
  }

  public build(): GameStatePayload {
    return this.state;
  }
}

export default GameStateBuilder;
