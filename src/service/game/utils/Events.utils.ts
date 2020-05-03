import { CreateEventPayload, GameEvent } from "../types";

export function createEvent(
  payload: CreateEventPayload & { duration: number }
): GameEvent {
  const { duration } = payload;
  const finishedAt = new Date(new Date().getTime() + duration);
  return {
    ...payload,
    createdAt: new Date(),
    finishedAt,
  };
}
