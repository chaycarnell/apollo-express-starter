export enum BaseServerRoutes {
  GRAPHQL = '/graphql',
  REST = '/rest',
  ROOT = '/',
}

export enum SubRoutes {
  PUBLIC = '/public',
  PROTECTED = '/protected',
}

export enum ErrorCodes {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  GRAPHQL_VALIDATION_FAILED = 'GRAPHQL_VALIDATION_FAILED',
  UNKNOWN = 'UNKNOWN',
}
