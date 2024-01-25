import { GraphQLFormattedError } from 'graphql';

import { getError } from '../common/errors';

const errorHandler = (formattedError: GraphQLFormattedError) => {
  // Check if a GraphQL extension code is present for the error
  const extensionCode = formattedError?.extensions?.code as string;
  // Return the corresponding error response from error templates
  return getError(extensionCode);
};

export default errorHandler;
