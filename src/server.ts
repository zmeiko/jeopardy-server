import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import * as resolvers from "./resolvers";
import Koa from "koa";
createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: Object.values(resolvers),
    });
    const server = new ApolloServer({ schema });
    const app = new Koa();
    app.use(server.getMiddleware());
    app.listen(3000, () => {
      console.log("Koa application is up and running on port 3000");
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
