import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../service/auth";
import * as users from "./User.controller";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export async function createTokens(payload: {
  username: string;
}): Promise<TokenPair> {
  const { username } = payload;
  const user = await users.findUserByUsername(username);

  if (!user) {
    throw new Error(`User with username ${username}`);
  }

  const accessToken = generateAccessToken({
    userId: user.id,
  });

  // todo: create token id in database
  const refreshToken = generateRefreshToken({
    refreshTokenId: 1,
    userId: user.id,
  });
  return {
    accessToken,
    refreshToken,
  };
}

export async function checkCredentials(payload: {
  username: string;
  password: string;
}) {
  return await users.checkPassword(payload);
}

export function verifyTokens(payload: {
  accessToken?: string;
  refreshToken?: string;
}) {
  const { accessToken, refreshToken } = payload;

  const isAccessTokenValid = !!accessToken && verifyAccessToken(accessToken);
  const isRefreshTokenValid =
    !!refreshToken && verifyRefreshToken(refreshToken);
  return isAccessTokenValid && isRefreshTokenValid;
}

export async function processTokens(payload: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<TokenPair | null> {
  let { accessToken, refreshToken } = payload;
  const isAccessTokenValid = !!accessToken && verifyAccessToken(accessToken);

  if (!isAccessTokenValid && refreshToken) {
    const refreshData = verifyRefreshToken(refreshToken);
    if (refreshData) {
      // todo: set refresh token as invalid in database
      accessToken = generateAccessToken({
        userId: refreshData.userId,
      });
      refreshToken = generateRefreshToken({
        refreshTokenId: refreshData.refreshTokenId,
        userId: refreshData.userId,
      });
    } else {
      return null;
    }
  }
  return {
    accessToken: accessToken!,
    refreshToken: refreshToken!,
  };
}

export function extractPayloadFromAccessToken(accessToken: string) {
  return verifyAccessToken(accessToken);
}

export async function logout(payload: { userId: number }) {
  // todo: remove refresh token from db
}
