import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import * as rooms from "../controllers/Room.controller";
import { RoomEntity } from "../entity/Room";
import { Context } from "../types/Context";

@Resolver(() => RoomEntity)
export class RoomResolver {
  @Authorized()
  @FieldResolver()
  async players(@Root() room: RoomEntity) {
    return await room.players;
  }

  @Authorized()
  @Query(() => [RoomEntity])
  async rooms() {
    return rooms.findAll();
  }

  @Authorized()
  @Mutation(() => RoomEntity)
  async createRoom(@Ctx() context: Context, @Arg("name") name: string) {
    const userId = context.user.userId!;
    const room = await rooms.createRoom({ name });
    await rooms.joinToRoom({ userId, roomId: room.id });
    return room;
  }

  @Authorized()
  @Mutation(() => RoomEntity)
  async joinToRoom(@Ctx() context: Context, @Arg("roomId") roomId: number) {
    const userId = context.user.userId!;
    const room = await rooms.joinToRoom({ userId, roomId });
    return room;
  }

  @Authorized()
  @Mutation(() => RoomEntity)
  async leaveRoom(@Ctx() context: Context, @Arg("roomId") roomId: number) {
    const userId = context.user.userId!;
    const room = await rooms.leaveRoom({ userId, roomId });
    return room;
  }
}
