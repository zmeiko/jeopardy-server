import * as Cookies from "cookies";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_LIVE_TIME_MS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_LIVE_TIME_MS,
} from "../../config/jwt";

export function updateCookies(
  payload: {
    accessToken: string;
    refreshToken: string;
  },
  cookies: Cookies
): void {
  const now = new Date().getTime();
  const expiresAccessToken = new Date(now + ACCESS_TOKEN_LIVE_TIME_MS);
  cookies.set(ACCESS_TOKEN_COOKIE_NAME, payload.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAccessToken,
    overwrite: true,
  });

  const expiresRefreshToken = new Date(now + REFRESH_TOKEN_LIVE_TIME_MS);
  cookies.set(REFRESH_TOKEN_COOKIE_NAME, payload.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresRefreshToken,
    overwrite: true,
  });
}

export function extractTokens(
  cookies: Cookies
): {
  accessToken?: string;
  refreshToken?: string;
} {
  const accessToken = cookies.get(ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME);
  return {
    accessToken,
    refreshToken,
  };
}
