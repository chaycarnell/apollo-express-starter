// Handles logging at different stages of an apollo servers lifecycle events
export default {
  async requestDidStart({ context, request, logger }: any) {
    // Determine if request needs to be logged
    const isIntrospectionQuery = request.operationName === 'IntrospectionQuery';
    if (!isIntrospectionQuery)
      logger.info(
        `⏳ New request: LogTraceId ${context.logTraceId} | Operation ${request.operationName}`,
      );
    return {
      // Handle logging response status
      async willSendResponse({ response }: any) {
        if (!response.errors && !isIntrospectionQuery)
          logger.info(
            `✅ Successfully completed: LogTraceId ${context.logTraceId} | Operation ${request.operationName}`,
          );
      },
      // Handle logging errors encountered
      async didEncounterErrors({ errors }: any) {
        // Strip lengthy stacktrace from each error
        errors.forEach(
          (error: any) =>
            // eslint-disable-next-line no-param-reassign
            error?.extensions?.exception && delete error.extensions.exception,
        );
        logger.error(
          `🚨 Error encountered: LogTraceId ${context.logTraceId} | Operation ${request.operationName} - Details:\n`,
          errors,
        );
      },
    };
  },
};
