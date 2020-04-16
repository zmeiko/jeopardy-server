import { RoomEntity } from "../entity/Room";
import * as users from "./User.controller";

export async function createRoom(payload: { name: string }) {
  const game = RoomEntity.create(payload);
  await game.save();
  return game;
}

export async function joinToRoom(payload: { userId: number; roomId: number }) {
  const { roomId, userId } = payload;
  const room = await RoomEntity.findOne(roomId);
  const user = await users.findUserById(userId);
  const players = await room.players;
  room.players = Promise.resolve([...players, user]);
  await room.save();
  return room;
}

export async function leaveRoom(payload: { userId: number; roomId: number }) {
  const { roomId, userId } = payload;
  const room = await RoomEntity.findOne(roomId);
  const players = await room.players;
  room.players = Promise.resolve(players.filter((user) => user.id !== userId));
  await room.save();
  return room;
}

export async function findAll() {
  const rooms = await RoomEntity.find();
  return rooms;
}
