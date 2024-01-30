import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';

import { createApolloServer, options } from './apolloServer';
import expressRoutes from './express/api/routes/routes';
import applyExpressMiddlewares from './express/middlewares/applyExpressMiddlewares';
import { BaseServerRoutes } from './types/enums';
import logger from './utils/logger';

const isProduction = process.env.NODE_ENV === 'production';

const port = (process.env.PORT && Number(process.env.PORT)) || 4001;

const app = express();

// Apply express middlewares
applyExpressMiddlewares(app, expressRoutes, isProduction);

const httpServer = http.createServer(app);

const apolloServer = createApolloServer(httpServer, isProduction);

(async () => {
  await apolloServer.start();
  // GraphQL server on dedicated route
  app.use(BaseServerRoutes.GRAPHQL, expressMiddleware(apolloServer, options));
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  logger.info(
    `Apollo Express server ready at http://localhost:${port} with base routes ${BaseServerRoutes.GRAPHQL} and ${BaseServerRoutes.REST}`,
  );
})();

// Gracefully shut down in the case of interrupt and termination signals
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => httpServer.close());
});
