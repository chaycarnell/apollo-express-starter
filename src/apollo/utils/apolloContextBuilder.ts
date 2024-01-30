import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';

import { CustomRequestContext } from '../../types/interfaces';

// Apply context from express logger and auth middlewares to graphql request context
const contextBuilder = async ({
  req,
}: ExpressContextFunctionArgument): Promise<CustomRequestContext> => ({
  user: req.user,
  authenticated: req.authenticated,
  logTraceId: req.logTraceId,
});

export default contextBuilder;
