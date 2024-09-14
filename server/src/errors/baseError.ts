abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message = '') {
    super(message);

    this.message = message;
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export default BaseError;
