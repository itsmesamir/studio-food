import * as jwt from 'jsonwebtoken';

import { TokenError } from '@/errors/errors';

import { Any } from '@/types/common';

import config from '@/config';
import { en } from '@/constants/lang';

/**
 * Create token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 */
export function createToken(data: Any) {
  try {
    const token = jwt.sign(data, config.jwt.secret, config.jwt.signOptions);

    return token;
  } catch (err) {
    throw new TokenError(en.TOKEN_CREATION_ERROR);
  }
}

/**
 * Create refresh token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 */
export function createRefreshToken(data: Any) {
  try {
    const token = jwt.sign(data, config.jwt.secret, config.jwt.refreshTokenSignOptions);

    return token;
  } catch (err) {
    throw new TokenError(en.TOKEN_CREATION_ERROR);
  }
}

/**
 * Verify token.
 *
 * @param {string} token - Token to be verified.
 * @returns {Object}
 */
export function verify(token: string) {
  try {
    const data = jwt.verify(token, config.jwt.secret, {
      algorithms: [config.jwt.signOptions.algorithm],
    });

    return data;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new TokenError(en.TOKEN_EXPIRED);
    }
    throw new TokenError(en.INVALID_TOKEN);
  }
}

export default { createToken, createRefreshToken, verify };
