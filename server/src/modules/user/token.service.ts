import * as jwt from '@/utils/jwt';

/**
 * Generates access token and refresh token.
 *
 * @param {Object} data
 * @returns {Promise<string>}
 */
export async function generateAccessAndRefreshTokens(data: unknown) {
  const refreshTokenData = { data: data, isRefreshToken: true };
  const accessTokenData = { data: data };

  const accessToken = jwt.createToken(accessTokenData);
  const refreshToken = jwt.createRefreshToken(refreshTokenData);

  return {
    accessToken,
    refreshToken,
  };
}
