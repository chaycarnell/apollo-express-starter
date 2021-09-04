// GraphQL server dependencies
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
// Glue used for matching resolvers with schema definitions
import glue from 'schemaglue';
import { v4 as uuidv4 } from 'uuid';
// Apollo server landing pages
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
// Optional utils for assisting with logging and error handling
import errorHandler from './utils/errorHandler';
import logger from './utils/logger';
import loggerPlugin from './utils/loggingPlugin';
// Get env vars
import env from './env';

// Glue schemas/resolvers together
const { schema, resolver } = glue('src/graphql', { mode: 'ts' });

// Derive if environment is production
const isProduction = env.NODE_ENV === 'production';

// Set the Apollo server landing page
const landingPage = isProduction
  ? ApolloServerPluginLandingPageDisabled()
  : ApolloServerPluginLandingPageGraphQLPlayground();

// Initialise Apollo server
const initialiseApolloServer = (app: any) => {
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: gql(schema),
      resolvers: resolver,
    }),
    formatError: errorHandler,
    introspection: !isProduction,
    plugins: [
      landingPage,
      loggerPlugin,
      ApolloServerPluginDrainHttpServer({ httpServer: app }),
    ],
    logger,
    context: async ({ connection }: any) => {
      // Filter out subscriptions
      if (connection) return connection.context;
      // Generate a UUID for log tracing through server
      const logTraceId = uuidv4();
      // Apply context to request
      return {
        logTraceId,
      };
    },
  });
  // Middleware: GraphQL
  server.start().then(() =>
    server.applyMiddleware({
      app,
    }),
  );
};

export default initialiseApolloServer;
