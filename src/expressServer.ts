import { expressMiddleware } from '@apollo/server/express4';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';

import publicRoutes from './api/routes/public';
import { createApolloServer, options } from './apolloServer';
import { BaseServerRoutes } from './types/enums';
import expressErrorHandler from './utils/expressErrorHandler';
import expressLogger from './utils/expressLogger';
import logger from './utils/logger';

const isProduction = process.env.NODE_ENV === 'production';

const port = (process.env.PORT && Number(process.env.PORT)) || 4001;

const app = express();

// Express config
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: isProduction ? undefined : false,
  }),
);
app.use(cors<cors.CorsRequest>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLogger);
app.use(expressErrorHandler);

// Public Express API routes
app.use(BaseServerRoutes.PUBLIC, publicRoutes);

const httpServer = http.createServer(app);

const apolloServer = createApolloServer(httpServer, isProduction);

(async () => {
  await apolloServer.start();
  // GraphQL server on dedicated route
  app.use(BaseServerRoutes.GRAPHQL, expressMiddleware(apolloServer, options));
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  logger.info(
    `Apollo Express server ready at http://localhost:${port} with routes /public /graphql`,
  );
})();

// Shut down in the case of interrupt and termination signals
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => httpServer.close());
});
