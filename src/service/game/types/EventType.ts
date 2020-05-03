export interface OnCorrectAnswerPayload {
  rightAnswer: string;
  userAnswer: string;
}

export interface OnIncorrectAnswerPayload {
  rightAnswer: string;
}

export const EVENT_TYPES = {
  ON_CORRECT_ANSWER: "on_correct_answer",
  ON_INCORRECT_ANSWER: "on_incorrect_answer",
};
export type EventType = "on_correct_answer" | "on_incorrect_answer";

export type EventPayload = OnCorrectAnswerPayload | OnIncorrectAnswerPayload;

interface EventInterval {
  createdAt: Date;
  finishedAt: Date;
}

interface OnCorrectAnswerEvent {
  type: "on_correct_answer";
  properties: OnCorrectAnswerPayload;
}

interface OnIncorrectAnswerEvent {
  type: "on_incorrect_answer";
  properties: OnIncorrectAnswerPayload;
}

export type CreateEventPayload = OnCorrectAnswerEvent | OnIncorrectAnswerEvent;

export type GameEvent = CreateEventPayload & EventInterval;
