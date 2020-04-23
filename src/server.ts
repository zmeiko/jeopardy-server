import { ApolloServer } from "apollo-server-koa";
import Koa from "koa";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CORS_ORIGIN, PORT } from "./config/server";
import * as resolvers from "./resolvers";
import { processConnection, processContext } from "./server.context";
import { authChecker } from "./service/auth";

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: Object.values(resolvers),
      authChecker: authChecker,
      validate: false,
    });
    const server = new ApolloServer({
      schema,
      playground: true,
      context: processContext,
      subscriptions: {
        onConnect: processConnection,
      },
    });
    const app = new Koa();
    app.use(
      server.getMiddleware({
        cors: {
          credentials: true,
          origin: CORS_ORIGIN,
        },
      })
    );

    const httpServer = app.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
      );
      server.installSubscriptionHandlers(httpServer);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
