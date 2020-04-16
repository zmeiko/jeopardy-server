import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import * as resolvers from "./resolvers";
import Koa from "koa";
import { authChecker } from "./service/Auth";

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: Object.values(resolvers),
      authChecker: authChecker,
    });
    const server = new ApolloServer({
      schema,
      context: (payload: { ctx: Koa.Context }) => {
        const { ctx } = payload;
        return ctx;
      },
    });
    const app = new Koa();
    app.use(server.getMiddleware());

    app.listen(3000, () => {
      console.log("Koa application is up and running on port 3000");
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
