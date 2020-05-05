import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_TOKEN_LIVE_TIME_SEC,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_TOKEN_LIVE_TIME_SEC,
} from "../../config/jwt";

interface TokenPair {
  accessToken?: string;
  refreshToken?: string;
}

export interface AccessTokenPayload {
  userId: number;
}

export interface RefreshTokenPayload extends AccessTokenPayload {
  refreshTokenId: number;
}

export function generateAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_LIVE_TIME_SEC,
  });
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_LIVE_TIME_SEC,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as AccessTokenPayload;
  } catch (e) {
    return null;
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload;
  } catch (e) {
    return null;
  }
}

export function tokensIsEquals(
  left: TokenPair | null,
  right: TokenPair | null
) {
  if (left === right) {
    return true;
  }
  if (!left || !right) {
    return false;
  }
  return (
    left.accessToken === right.accessToken &&
    left.refreshToken === right.refreshToken
  );
}
