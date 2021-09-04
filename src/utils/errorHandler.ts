interface ErrorObject {
  code: number;
  message: string;
}

interface ErrorMap {
  [error: string]: ErrorObject;
}

// Map of known error types to be returned to client from the server
const errorTypes: ErrorMap = {
  UNAUTHENTICATED: { code: 401, message: 'UNAUTHENTICATED' },
  FORBIDDEN: { code: 403, message: 'FORBIDDEN' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'INTERNAL_SERVER_ERROR' },
  GRAPHQL_VALIDATION_FAILED: {
    code: 500,
    message: 'GRAPHQL_VALIDATION_FAILED',
  },
  UNKNOWN: { code: 500, message: 'UNKNOWN_ERROR' },
};

// Derive error response from GraphQL error
const searchOriginalError = (error: any): any => {
  if (error.originalError) {
    return searchOriginalError(error.originalError);
  }
  if (error.errors) {
    return error.errors.map(searchOriginalError)[0];
  }
  return JSON.parse(error);
};

// Handle errors
const errorHandler = (error: any): ErrorObject => {
  const getError = (errorCode: string) => {
    if (!errorTypes[errorCode]) {
      return errorTypes.UNKNOWN;
    }
    return errorTypes[errorCode];
  };
  // Derive the root error
  const rootError = error.message ? error : searchOriginalError(error);
  // Check if a GraphQL extension code is present for the error
  const extensionCode = rootError.extensions && rootError.extensions.code;
  // Get the corresponding error response from error templates
  const responseObject = getError(extensionCode);
  return {
    code: responseObject.code,
    message: responseObject.message,
  };
};

export default errorHandler;
