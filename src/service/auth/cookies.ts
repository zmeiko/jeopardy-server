import Cookies from "cookies";
import {
  JWT_ACCESS_TOKEN_COOKIE_NAME,
  JWT_ACCESS_TOKEN_LIVE_TIME_MS,
  JWT_REFRESH_TOKEN_COOKIE_NAME,
  JWT_REFRESH_TOKEN_LIVE_TIME_MS,
} from "../../config/jwt";
import { COOKIES_SECURE } from "../../config/server";

const COOKIE_OPTS: Cookies.SetOption = {
  sameSite: COOKIES_SECURE ? "none" : "lax",
  secure: COOKIES_SECURE,
  overwrite: true,
  httpOnly: true,
};

export function updateCookies(
  payload: {
    accessToken: string;
    refreshToken: string;
  },
  cookies: Cookies
): void {
  const now = new Date().getTime();
  const expiresAccessToken = new Date(now + JWT_ACCESS_TOKEN_LIVE_TIME_MS);

  cookies.set(JWT_ACCESS_TOKEN_COOKIE_NAME, payload.accessToken, {
    ...COOKIE_OPTS,
    expires: expiresAccessToken,
  });

  const expiresRefreshToken = new Date(now + JWT_REFRESH_TOKEN_LIVE_TIME_MS);
  cookies.set(JWT_REFRESH_TOKEN_COOKIE_NAME, payload.refreshToken, {
    ...COOKIE_OPTS,
    expires: expiresRefreshToken,
  });
}

export function removeCookies(cookies: Cookies) {
  cookies.set(JWT_ACCESS_TOKEN_COOKIE_NAME, "", COOKIE_OPTS);
  cookies.set(JWT_REFRESH_TOKEN_COOKIE_NAME, "", COOKIE_OPTS);
}

export function extractTokens(
  cookies: Cookies
): {
  accessToken?: string;
  refreshToken?: string;
} {
  const accessToken = cookies.get(JWT_ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = cookies.get(JWT_REFRESH_TOKEN_COOKIE_NAME);
  return {
    accessToken,
    refreshToken,
  };
}
