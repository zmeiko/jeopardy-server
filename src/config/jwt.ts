export const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export const ACCESS_TOKEN_LIVE_TIME_SEC = 5 * 60; // 10 minutes
export const ACCESS_TOKEN_LIVE_TIME_MS = ACCESS_TOKEN_LIVE_TIME_SEC * 1000;

export const REFRESH_TOKEN_LIVE_TIME_SEC = 30 * 24 * 60 * 60; // 1 month;
export const REFRESH_TOKEN_LIVE_TIME_MS = REFRESH_TOKEN_LIVE_TIME_SEC * 1000;

export const ACCESS_JWT_SECRET = "SECRET"; // todo: add to env
export const REFRESH_JWT_SECRET = "REFRESH_SECRET"; // todo: add to env
