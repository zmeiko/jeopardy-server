import { CreateUserInput } from "../inputs/CreateUserInput";
import { User } from "../entity/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = User.create(data);
    await user.save();
    return user;
  }

  @Query(() => User)
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
  }
}
