import * as Cookies from "cookies";
import jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const ACCESS_TOKEN_LIVE_TIME_SEC = 10 * 60;
const ACCESS_TOKEN_LIVE_TIME_MS = ACCESS_TOKEN_LIVE_TIME_SEC * 1000;
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
const JWT_SECRET = "SECRET"; // todo: add to env

export const authChecker: AuthChecker<{ cookies: Cookies }> = (
  { context, info },
  roles
) => {
  const token = context.cookies.get(ACCESS_TOKEN_COOKIE_NAME);
  if (token) {
    const user = jwt.verify(token, JWT_SECRET);
    return !!user;
  }
  return false;
};

export function applyToken(userId: number, cookies: Cookies): string {
  const token = jwt.sign(
    {
      userId: userId,
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_LIVE_TIME_SEC }
  );
  const expires = new Date(new Date().getTime() + ACCESS_TOKEN_LIVE_TIME_MS);
  cookies.set(ACCESS_TOKEN_COOKIE_NAME, token, {
    httpOnly: false,
    sameSite: "lax",
    expires,
    overwrite: true,
  });
  return token;
}
