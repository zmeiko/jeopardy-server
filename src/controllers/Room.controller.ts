import { RoomEntity } from "../entity/Room.entry";
import * as users from "./User.controller";

export async function createRoom(payload: { name: string }) {
  const game = RoomEntity.create(payload);
  await game.save();
  return game;
}

export async function joinToRoom(payload: { userId: number; roomId: number }) {
  const { roomId, userId } = payload;
  const room = await RoomEntity.findOne(roomId);

  if (!room) {
    throw new Error(`Room with id = ${roomId} not found`);
  }

  const user = await users.findUserById(userId);

  if (!user) {
    throw new Error(`User with id = ${userId} not found`);
  }

  const players = await room.users;
  room.users = Promise.resolve([...players, user]);
  await room.save();
  return room;
}

export async function leaveRoom(payload: { userId: number; roomId: number }) {
  const { roomId, userId } = payload;
  const room = await RoomEntity.findOne(roomId);

  if (!room) {
    throw new Error(`Room with id = ${roomId} not found`);
  }

  const players = await room.users;

  room.users = Promise.resolve(players.filter((user) => user.id !== userId));
  await room.save();
  return room;
}

export async function findAll() {
  const rooms = await RoomEntity.find();
  return rooms;
}

export async function findRoomById(roomId: number) {
  const room = await RoomEntity.findOne(roomId);
  return room;
}
