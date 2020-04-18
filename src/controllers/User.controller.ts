import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { BCRYPT_SALT } from "../config/secret";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

export async function findUsersByIds(ids: number[]): Promise<User[]> {
  return User.findByIds(ids);
}

export async function findAll(): Promise<User[]> {
  return User.find();
}

export async function findUserById(id: number, options?: FindOneOptions<User>) {
  return User.findOne(id, options);
}

export async function createUser(payload: {
  username: string;
  password: string;
}) {
  const { username, password } = payload;
  const hashPassword = await bcrypt.hash(password, BCRYPT_SALT);
  const user = User.create({
    username,
    password: hashPassword,
  });
  await user.save();
  return user;
}

export async function findUserByUsername(username: string) {
  return await User.findOne({
    where: {
      username,
    },
    cache: 10000,
  });
}

export async function checkPassword(payload: {
  username: string;
  password: string;
}): Promise<boolean> {
  const { username, password } = payload;
  const user = await findUserByUsername(username);
  if (user) {
    return bcrypt.compare(password, user.password);
  }
  return false;
}
