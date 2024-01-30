import { ApolloServerPlugin } from '@apollo/server';

import { CustomRequestContext } from '../../types/interfaces';
import logger from '../../utils/logger';

export const loggingPlugin = (): ApolloServerPlugin<CustomRequestContext> => ({
  async requestDidStart({ contextValue, request }) {
    // Do not log introspection requests
    const isIntrospectionQuery = request.operationName === 'IntrospectionQuery';
    if (!isIntrospectionQuery)
      logger.info(
        `[Apollo] New request: LogTraceId ${contextValue.logTraceId} | Operation ${request.operationName}${contextValue.authenticated ? ` | User ${contextValue.user?.id}` : ''}`,
      );
    return {
      // Handle logging response status
      async willSendResponse() {
        if (!isIntrospectionQuery) {
          logger.info(
            `[Apollo] Returning response: LogTraceId ${contextValue.logTraceId} | Operation ${request.operationName}`,
          );
        }
      },
      // Handle logging errors encountered
      async didEncounterErrors({ errors }) {
        logger.error(
          `[Apollo] Error encountered: LogTraceId ${contextValue.logTraceId} | Operation ${request.operationName}`,
          { errors },
        );
      },
    };
  },
});

export default loggingPlugin;
