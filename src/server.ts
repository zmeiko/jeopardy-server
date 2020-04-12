import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import * as resolvers from "./resolvers";

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: Object.values(resolvers),
    });
    const server = new ApolloServer({ schema });
    await server.listen(3000);
    console.log("Koa application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
