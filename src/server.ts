import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import {
  extractPayloadFromAccessToken,
  processTokens,
} from "./controllers/Auth.controller";
import * as resolvers from "./resolvers";
import Koa from "koa";
import { authChecker, tokensIsEquals } from "./service/Auth";
import { extractTokens, updateCookies } from "./service/Auth/cookiesManager";
import { Context } from "./types/Context";

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: Object.values(resolvers),
      authChecker: authChecker,
    });
    const server = new ApolloServer({
      schema,
      context: async (payload: { ctx: Koa.Context }): Promise<Context> => {
        const { ctx } = payload;
        const oldTokens = extractTokens(ctx.cookies);
        const newTokens = await processTokens(oldTokens);

        if (!tokensIsEquals(oldTokens, newTokens)) {
          updateCookies(newTokens, ctx.cookies);
        }

        let user;
        const { accessToken } = newTokens;
        if (accessToken) {
          user = extractPayloadFromAccessToken(accessToken);
        }
        return { ctx, user };
      },
    });
    const app = new Koa();
    app.use(server.getMiddleware());

    app.listen(3000, () => {
      console.log("Koa application is up and running on port 3000");
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
