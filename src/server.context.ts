import { ContextFunction } from "apollo-server-core/src/types";
import Cookies from "cookies";
import Koa from "koa";
import "reflect-metadata";
import { ConnectionContext } from "subscriptions-transport-ws";
import {
  extractPayloadFromAccessToken,
  processTokens,
  verifyTokens,
} from "./controllers/Auth.controller";
import { tokensIsEquals } from "./service/auth";
import { extractTokens, updateCookies } from "./service/auth/cookies";
import { Context } from "./types/Context";

interface AppConnectionContext {
  user?: { userId: number };
}

export const processContext: ContextFunction = async (payload: {
  ctx: Koa.Context;
  connection: {
    context: AppConnectionContext;
  };
}): Promise<Context> => {
  const { ctx, connection } = payload;
  if (ctx) {
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
    return { user, cookies: ctx.cookies };
  } else if (connection) {
    return connection.context;
  }
};

export const processConnection = (
  _1: any,
  _2: any,
  context: ConnectionContext
): AppConnectionContext => {
  const cookies = new Cookies(context.request, null);
  const tokens = extractTokens(cookies);
  if (verifyTokens(tokens)) {
    const user = extractPayloadFromAccessToken(tokens.accessToken);
    return {
      user,
    };
  }
  return null;
};
