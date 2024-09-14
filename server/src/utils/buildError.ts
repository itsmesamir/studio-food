import HttpStatus from 'http-status-codes';

import BaseError from '@/errors/baseError';

import { Any } from '@/types/common';
import { BuildError } from '@/types/error';

export const buildError = (error: Any): BuildError[] => {
  if (error instanceof BaseError) {
    return error.serializeErrors();
  }

  return [
    {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
    },
  ];
};
