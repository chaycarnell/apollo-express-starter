import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLFormattedError } from 'graphql';
import http from 'http';
import path from 'path';

import loggerPlugin from './apollo/plugins/apolloLogger';
import contextBuilder from './apollo/utils/apolloContextBuilder';
import errorHandler from './apollo/utils/apollolErrorHandler';
import { Resolvers } from './types/graphql-generated';
import logger from './utils/logger';

const typeDefs = loadFilesSync(path.join(__dirname, '../schemas/**/*.graphql'));
const resolvers = loadFilesSync(
  path.join(__dirname, 'apollo/schemas/**/*.resolver.*'),
) as Resolvers;

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
    formatError: (formattedError: GraphQLFormattedError, _error: unknown) =>
      errorHandler(formattedError),
  });
};

const options = {
  context: contextBuilder,
};

export { createApolloServer, options };
