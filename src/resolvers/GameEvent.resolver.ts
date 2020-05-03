import { Resolver } from "type-graphql";
import { GameEventEntity } from "../entity/GameEvent.entry";

@Resolver(() => GameEventEntity)
export class GameEventResolver {}
