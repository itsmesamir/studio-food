import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { buildError } from '@/utils/buildError';

import config from '@/config';

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 */
export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatus.NOT_FOUND).json({
    errors: [
      {
        code: HttpStatus.NOT_FOUND,
        message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      },
    ],
  });
}

export function genericErrorHandler(
  err: any, //eslint-disable-line @typescript-eslint/no-explicit-any
  req: Request,
  res: Response,
  next: NextFunction //eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (err.stack && config.NODE_ENV !== 'test') {
    console.error(err.stack);
  } else {
    console.error(err.message);
  }

  const errors = buildError(err);

  return res.status(err.statusCode || 500).json({ errors });
}
