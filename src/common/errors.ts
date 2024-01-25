import { ErrorMap } from '../types/types';

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

export const getError = (errorCode: string) => {
  if (!errorTypes[errorCode]) {
    return errorTypes.UNKNOWN;
  }
  return errorTypes[errorCode];
};
