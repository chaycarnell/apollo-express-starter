import { ErrorObject } from '../types/interfaces';
import { ErrorCode, ErrorMap } from '../types/types';

export class CustomExpressError extends Error {
  public errorCode: ErrorCode;
  constructor(errorCode: ErrorCode, message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Map of known error types to be returned to client
export const errorTypes: ErrorMap = {
  UNAUTHENTICATED: { status: 401, message: 'UNAUTHENTICATED' },
  UNAUTHORIZED: { status: 401, message: 'UNAUTHORIZED' },
  FORBIDDEN: { status: 403, message: 'FORBIDDEN' },
  INTERNAL_SERVER_ERROR: { status: 500, message: 'INTERNAL_SERVER_ERROR' },
  GRAPHQL_VALIDATION_FAILED: {
    status: 500,
    message: 'GRAPHQL_VALIDATION_FAILED',
  },
  UNKNOWN: { status: 500, message: 'UNKNOWN_ERROR' },
};

export const getError = (errorCode: ErrorCode): ErrorObject => {
  if (!errorTypes[errorCode]) {
    return errorTypes.UNKNOWN;
  }
  return errorTypes[errorCode];
};
