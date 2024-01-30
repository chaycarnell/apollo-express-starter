import { GraphQLFormattedError } from 'graphql';

import { getError } from '../../common/errors';
import { ErrorObject } from '../../types/interfaces';
import { ErrorCode } from '../../types/types';

const errorHandler = (formattedError: GraphQLFormattedError): ErrorObject => {
  // Check if a GraphQL extension code is present for the error
  const extensionCode = formattedError?.extensions?.code as ErrorCode;
  // Return the corresponding error response from error templates
  return getError(extensionCode);
};

export default errorHandler;
