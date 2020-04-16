import jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import {
  ACCESS_TOKEN_LIVE_TIME_SEC,
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
  REFRESH_TOKEN_LIVE_TIME_SEC,
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
  return jwt.sign(payload, ACCESS_JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_LIVE_TIME_SEC,
  });
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_LIVE_TIME_SEC,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    return jwt.verify(token, ACCESS_JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    return jwt.verify(token, REFRESH_JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function tokensIsEquals(left: TokenPair, right: TokenPair) {
  return (
    left.accessToken === right.accessToken &&
    left.refreshToken === right.refreshToken
  );
}
