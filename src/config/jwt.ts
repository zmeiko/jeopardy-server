export const JWT_ACCESS_TOKEN_COOKIE_NAME = "accessToken";
export const JWT_REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export const JWT_ACCESS_TOKEN_LIVE_TIME_SEC = 5 * 60; // 10 minutes
export const JWT_ACCESS_TOKEN_LIVE_TIME_MS =
  JWT_ACCESS_TOKEN_LIVE_TIME_SEC * 1000;

export const JWT_REFRESH_TOKEN_LIVE_TIME_SEC = 30 * 24 * 60 * 60; // 1 month;
export const JWT_REFRESH_TOKEN_LIVE_TIME_MS =
  JWT_REFRESH_TOKEN_LIVE_TIME_SEC * 1000;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh";
