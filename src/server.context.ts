import { ContextFunction } from "apollo-server-core/src/types";
import Cookies from "cookies";
import Koa from "koa";
import "reflect-metadata";
import { ConnectionContext } from "subscriptions-transport-ws";
import { COOKIES_SECURE } from "./config/server";
import {
  extractPayloadFromAccessToken,
  processTokens,
  verifyTokens,
} from "./controllers/Auth.controller";
import { tokensIsEquals } from "./service/auth";
import { extractTokens, updateCookies } from "./service/auth/cookies";

interface AppConnectionContext {
  user?: { userId: number } | null;
}

type Context =
  | {
      cookies?: Cookies;
      user?: {
        userId?: number;
      } | null;
    }
  | undefined;

export const processContext: ContextFunction = async (payload: {
  ctx: Koa.Context;
  connection: {
    context: AppConnectionContext;
  };
}): Promise<Context> => {
  const { ctx, connection } = payload;
  if (ctx) {
    ctx.cookies.secure = COOKIES_SECURE;

    let user = undefined;

    const requestTokens = extractTokens(ctx.cookies);
    if (requestTokens.accessToken && requestTokens.accessToken) {
      const responseTokens = await processTokens(requestTokens);

      if (!tokensIsEquals(requestTokens, responseTokens)) {
        updateCookies(responseTokens!, ctx.cookies);
      }

      if (responseTokens?.accessToken) {
        user = extractPayloadFromAccessToken(responseTokens?.accessToken);
      }
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
  // we need only request cookies
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const cookies = new Cookies(context.request, null, {
    secure: COOKIES_SECURE,
  });
  const tokens = extractTokens(cookies);
  if (verifyTokens(tokens)) {
    const user = extractPayloadFromAccessToken(tokens.accessToken!);
    return {
      user,
    };
  }
  return {
    user: undefined,
  };
};
