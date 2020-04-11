import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { User } from "../entity/User";

export async function findUsers(ids: number[]): Promise<User[]> {
  return User.findByIds(ids);
}

export async function findUserById(id: number, options?: FindOneOptions<User>) {
  return User.findOne(id, options);
}
