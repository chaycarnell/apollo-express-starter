import { ApolloServerPlugin } from '@apollo/server';
import { GraphQLError } from 'graphql';

import { CustomContext } from '../types/interfaces';
import logger from './logger';

export const LoggingPlugin = (): ApolloServerPlugin<CustomContext> => ({
  async requestDidStart({ contextValue, request }) {
    // Do not log introspection requests
    const isIntrospectionQuery = request.operationName === 'IntrospectionQuery';
    if (!isIntrospectionQuery)
      logger.info(
        `New request: LogTraceId ${contextValue.logTraceId} | Operation ${request.operationName}`,
      );
    return {
      // Handle logging response status
      async willSendResponse() {
        if (!isIntrospectionQuery) {
          logger.info(
            `Returning response: LogTraceId ${contextValue.logTraceId} | Operation ${request.operationName}`,
          );
        }
      },
      // Handle logging errors encountered
      async didEncounterErrors({ errors }) {
        // Strip lengthy stacktrace from each error
        errors.forEach(
          (error: GraphQLError) =>
            error?.extensions?.exception && delete error.extensions.exception,
        );
        logger.error(
          `Error encountered: LogTraceId ${contextValue.logTraceId} | Operation ${request.operationName} - Details:`,
          { errors },
        );
      },
    };
  },
});

export default LoggingPlugin;
