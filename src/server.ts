import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  GamePlayerScoreResolver,
  GameResolver,
  GameStateResolver,
  UserResolver,
} from "./resolvers";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        GameResolver,
        GameStateResolver,
        GamePlayerScoreResolver,
      ],
    });
    const server = new ApolloServer({ schema });
    await server.listen(3000);
    console.log("Koa application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
