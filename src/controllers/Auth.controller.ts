import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../service/Auth";
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
  const passwordIsValid = await users.checkPassword(payload);
  return passwordIsValid;
}

export async function processTokens(payload: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<TokenPair> {
  let { accessToken, refreshToken } = payload;
  const isAccessTokenValid = !!accessToken && verifyAccessToken(accessToken);
  if (!isAccessTokenValid) {
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
      accessToken = undefined;
      refreshToken = undefined;
    }
  }
  return {
    accessToken,
    refreshToken,
  };
}

export function extractPayloadFromAccessToken(accessToken: string) {
  return verifyAccessToken(accessToken);
}
