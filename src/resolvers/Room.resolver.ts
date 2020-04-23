import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  PubSubEngine,
} from "type-graphql";
import { ResolverFilterData } from "type-graphql/dist/interfaces";
import { CHANGE_ROOM_USERS } from "../const/subscriptions";
import * as rooms from "../controllers/Room.controller";
import { RoomEntity } from "../entity/Room.entry";
import { UserEntry } from "../entity/User.entry";
import { Context } from "../types/Context";

type OnChangeUsersInRoomPayload = {
  roomId: number;
};

@Resolver(() => RoomEntity)
export class RoomResolver {
  @Authorized()
  @Subscription(() => [UserEntry], {
    topics: CHANGE_ROOM_USERS,
    filter: (
      params: ResolverFilterData<OnChangeUsersInRoomPayload, { roomId: number }>
    ) => {
      const { payload, args } = params;
      return payload.roomId === args.roomId;
    },
  })
  async onChangeUsersInRoom(
    @Root() payload: OnChangeUsersInRoomPayload,
    @Arg("roomId", () => Int) roomId: number
  ): Promise<UserEntry[]> {
    const room = await rooms.findRoomById(roomId);
    return await room.users;
  }

  @Authorized()
  @Query(() => RoomEntity)
  async room(@Arg("id", () => ID) id: number) {
    return rooms.findRoomById(id);
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
  async joinToRoom(
    @Ctx() context: Context,
    @Arg("roomId", () => Int) roomId: number,
    @PubSub() pubSub: PubSubEngine
  ) {
    const userId = context.user.userId!;
    const room = await rooms.joinToRoom({ userId, roomId });
    await pubSub.publish(CHANGE_ROOM_USERS, {
      roomId,
    });
    return room;
  }

  @Authorized()
  @Mutation(() => RoomEntity)
  async leaveRoom(
    @Ctx() context: Context,
    @Arg("roomId", () => Int) roomId: number,
    @PubSub() pubSub: PubSubEngine
  ) {
    const userId = context.user.userId!;
    const room = await rooms.leaveRoom({ userId, roomId });
    await pubSub.publish(CHANGE_ROOM_USERS, {
      roomId,
    });
    return room;
  }

  @Authorized()
  @FieldResolver()
  async users(@Root() room: RoomEntity) {
    return await room.users;
  }
}
