import * as Koa from "Koa";
export interface Context {
  ctx: Koa.Context;
  user?: {
    userId: number;
  };
}
