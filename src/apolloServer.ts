import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { GraphQLFormattedError } from 'graphql';
import http from 'http';
import path from 'path';

import errorHandler from './utils/graphqlErrorHandler';
import loggerPlugin from './utils/graphqlLogger';
import logger from './utils/logger';

const typeDefs = loadFilesSync(path.join(__dirname, '../schemas/**/*.graphql'));
const resolvers = loadFilesSync(
  path.join(__dirname, 'schemas/**/*.resolver.*'),
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const createApolloServer = (httpServer: http.Server, isProduction: boolean) => {
  const landingPage = isProduction
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageLocalDefault();
  return new ApolloServer({
    schema,
    plugins: [
      landingPage,
      loggerPlugin(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    logger,
    introspection: !isProduction,
    formatError: (formattedError: GraphQLFormattedError, __: unknown) =>
      errorHandler(formattedError),
  });
};

const options = {
  context: async ({ req }: { req: express.Request }) => {
    // Mock example of adding a user to request context if authorization header present
    // For production suggest to use GraphQL Shield in combination with JWT validation/decode utils
    const user = (req.headers.authorization && { id: '1000' }) || undefined;
    // Apply context to request
    return { user, logTraceId: req.logTraceId };
  },
};

export { createApolloServer, options };
