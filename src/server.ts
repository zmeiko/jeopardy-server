import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolvers/UserResolver";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: [UserResolver],
    });
    const server = new ApolloServer({ schema });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    await server.listen(3000);
    console.log("Koa application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
