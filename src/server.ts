import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CORS_ORIGIN, PORT } from "./config/server";
import {
  extractPayloadFromAccessToken,
  processTokens,
} from "./controllers/Auth.controller";
import * as resolvers from "./resolvers";
import Koa from "koa";
import { authChecker, tokensIsEquals } from "./service/auth";
import { extractTokens, updateCookies } from "./service/auth/cookies";
import { Context } from "./types/Context";

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
    app.use(
      server.getMiddleware({
        cors: {
          credentials: true,
          origin: CORS_ORIGIN,
        },
      })
    );

    app.listen(PORT, () => {
      console.log(`Koa application is up and running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
