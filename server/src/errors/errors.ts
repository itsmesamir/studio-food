import HttpStatus from 'http-status-codes';

import BaseError from './baseError';

export class BadRequestError extends BaseError {
  statusCode = HttpStatus.BAD_REQUEST;

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class DatabaseError extends BaseError {
  statusCode = HttpStatus.BAD_REQUEST;

  serializeErrors() {
    return [{ message: 'Something went wrong' }];
  }
}

export class ForbiddenError extends BaseError {
  statusCode = HttpStatus.FORBIDDEN;

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class UnauthorizedError extends BaseError {
  statusCode = HttpStatus.UNAUTHORIZED;

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class RowNotFoundError extends BaseError {
  statusCode = HttpStatus.NOT_FOUND;

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class TokenError extends BaseError {
  statusCode = HttpStatus.UNAUTHORIZED;

  serializeErrors() {
    return [{ message: this.message || 'Invalid token' }];
  }
}

export class ValidationError extends BaseError {
  statusCode = HttpStatus.BAD_REQUEST;

  serializeErrors() {
    return [{ message: this.message }];
  }
}
