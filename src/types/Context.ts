import * as Koa from "koa";
export interface Context {
  ctx: Koa.Context;
  user?: {
    userId: number;
  };
}
