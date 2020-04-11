import {
  GameQuestion,
  GameSettings,
  GameState,
  GameStatePayload,
} from "../Game.types";
import { BaseGameState } from "./BaseGameState";
import {
  concatAllQuestionInRound,
  findRound,
  getNextRoundOrFinishState,
  roundWillFinish,
  updateScore,
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
    const { answer: answerText, playerId } = payload;
    const { answeringPlayerId } = this.gameState;
    if (playerId !== answeringPlayerId) {
      throw new Error(`Only user with id = ${playerId} can answer`);
    }
    const question = this.getCurrentQuestion();
    const rightAnswer = question.answer;
    if (answerText !== rightAnswer) {
      return this.wrongAnswer({ price: question.price });
    } else {
      return this.rightAnswer({ price: question.price });
    }
  }

  protected wrongAnswer(payload: { price: number }): GameState {
    const { answeringPlayerId, answeredPlayerIds } = this.gameState;
    const newPlayerScores = updateScore(this.gameState.playerScores, {
      playerId: answeringPlayerId,
      score: -payload.price,
    });
    const newAnsweredPlayerIds = [...answeredPlayerIds, answeringPlayerId];
    const nextPayloadState = {
      ...this.gameState,
      playerScore: newPlayerScores,
      cardSelectionAt: new Date(),
      answeringUserId: null,
      answeredPlayerIds: newAnsweredPlayerIds,
    };
    const allPlayerHasAnswered =
      newAnsweredPlayerIds.length === this.gameSettings.playerIds.length;

    if (allPlayerHasAnswered) {
      if (roundWillFinish(nextPayloadState, this.gameSettings)) {
        return getNextRoundOrFinishState(nextPayloadState, this.gameSettings);
      } else {
        const waitingPayloadState: GameStatePayload = {
          ...nextPayloadState,
          answeringPlayerId: null,
          answeredPlayerIds: [],
          selectedQuestionId: null,
        };

        return new WaitingForCardSelection(
          waitingPayloadState,
          this.gameSettings
        );
      }
    } else {
      return new WaitingForQuestionCapture(nextPayloadState, this.gameSettings);
    }
  }

  private rightAnswer(payload: { price: number }): GameState {
    const {
      answeringPlayerId,
      openedQuestionsIds,
      selectedQuestionId,
    } = this.gameState;
    const newPlayerScores = updateScore(this.gameState.playerScores, {
      playerId: answeringPlayerId,
      score: payload.price,
    });
    const newOpenedQuestionIds = [...openedQuestionsIds, selectedQuestionId];
    const nextPayloadSate: GameStatePayload = {
      ...this.gameState,
      openedQuestionsIds: newOpenedQuestionIds,
      playerScores: newPlayerScores,
      currentPlayerId: answeringPlayerId,
      answeringPlayerId: null,
      answeredPlayerIds: [],
      selectedQuestionId: null,
    };
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
}
