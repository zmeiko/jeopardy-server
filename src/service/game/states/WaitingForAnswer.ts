import { EVENT_DURATIONS } from "../Game.const";
import {
  GameQuestion,
  GameSettings,
  GameState,
  GameStatePayload,
} from "../Game.types";
import GameStateBuilder from "../utils/StateBuilder";
import { BaseGameState } from "./BaseGameState";
import {
  concatAllQuestionInRound,
  findRound,
  getNextRoundOrFinishState,
  roundWillFinish,
} from "./helper";

import { ACTIONS_STATES } from "./states.const";
import { WaitingForCardSelection } from "./WaitingForCardSelection";
import { WaitingForQuestionCapture } from "./WaitingForQuestionCapture";

export class WaitingForAnswer extends BaseGameState {
  constructor(statePayload: GameStatePayload, gameSettings: GameSettings) {
    super(
      {
        ...statePayload,
        stateName: ACTIONS_STATES.WAITING_FOR_USER_ANSWER,
      },
      gameSettings
    );
  }

  answer(payload: {
    playerId: number;
    answer: string;
    timestamp?: Date;
  }): GameState {
    const { answer: answerText, playerId, timestamp = new Date() } = payload;
    const { answeringPlayerId } = this.gameState;
    if (playerId !== answeringPlayerId) {
      throw new Error(`Only user with id = ${playerId} can answer`);
    }
    if (this.timeIsOver(timestamp)) {
      return this.wrongAnswer();
    }

    const question = this.getCurrentQuestion();
    const rightAnswer = question.answer;
    if (answerText !== rightAnswer) {
      return this.wrongAnswer();
    } else {
      return this.rightAnswer({ userAnswer: answerText });
    }
  }

  tick(payload: { timestamp?: Date }): GameState {
    const { timestamp = new Date() } = payload;
    if (this.timeIsOver(timestamp)) {
      return this.wrongAnswer();
    }
    return this;
  }

  protected wrongAnswer(): GameState {
    const question = this.getCurrentQuestion();
    const { price } = question;
    const { answeredPlayerIds } = this.gameState;
    let stateBuilder = new GameStateBuilder(this.gameState)
      .updateScore({
        scoreDelta: -price,
      })
      .markPlayerAsAnswered()
      .reselectCard();

    const allPlayerHasAnswered =
      answeredPlayerIds.length + 1 === this.gameSettings.playerIds.length;

    if (allPlayerHasAnswered) {
      const nextState = stateBuilder.build();
      if (roundWillFinish(nextState, this.gameSettings)) {
        return getNextRoundOrFinishState(nextState, this.gameSettings);
      } else {
        stateBuilder = stateBuilder
          .addEvent({
            type: "on_incorrect_answer",
            properties: {
              rightAnswer: question.answer,
            },
            duration: EVENT_DURATIONS.CORRECT_ANSWER,
          })
          .closeQuestion();

        return new WaitingForCardSelection(
          stateBuilder.build(),
          this.gameSettings
        );
      }
    } else {
      return new WaitingForQuestionCapture(
        stateBuilder.build(),
        this.gameSettings
      );
    }
  }

  private rightAnswer(payload: { userAnswer: string }): GameState {
    const { userAnswer } = payload;
    const question = this.getCurrentQuestion();
    const { price } = question;

    const nextPayloadSate = new GameStateBuilder(this.gameState)
      .updateScore({
        scoreDelta: price,
      })
      .selectPlayer()
      .closeQuestion()
      .addEvent({
        type: "on_correct_answer",
        properties: {
          rightAnswer: question.answer,
          userAnswer,
        },
        duration: EVENT_DURATIONS.CORRECT_ANSWER,
      })
      .build();

    if (roundWillFinish(nextPayloadSate, this.gameSettings)) {
      return getNextRoundOrFinishState(nextPayloadSate, this.gameSettings);
    } else {
      return new WaitingForCardSelection(nextPayloadSate, this.gameSettings);
    }
  }

  private getCurrentQuestion(): GameQuestion {
    const { currentRoundId, selectedQuestionId } = this.gameState;
    const currentRound = findRound(this.gameSettings, currentRoundId);
    if (!currentRound) {
      throw new Error(`Round with id = ${currentRoundId} not found`);
    }
    const questions = concatAllQuestionInRound(currentRound);
    const question = questions.find(
      (question) => question.id === selectedQuestionId
    );
    if (!question) {
      throw new Error(`Question with id = ${selectedQuestionId} not found`);
    }
    return question;
  }

  private timeIsOver(timestamp: Date): boolean {
    const now = timestamp.getTime();
    const selectedTimestamp = this.gameState.questionCaptureAt?.getTime();
    return selectedTimestamp + this.gameSettings.answerTimeoutMs < now;
  }
}
