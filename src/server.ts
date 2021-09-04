require('dotenv').config();
import express from 'express';
import { createServer } from 'http';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import initialiseApolloServer from './apolloServer';
import logger from './utils/logger';
import publicRoutes from './api/routes/public';
import env from './env';

const app = express();
const server = createServer(app);

// Set server port
const port = env.PORT || 3001;

// Express config
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
  }),
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Expose API routes
app.use('/public', publicRoutes);

// Initiliase Apollo server
initialiseApolloServer(app);

// Start listening
server.listen({ port }, () => {
  logger.info(`🚀  Server ready on ${port}`);
});

// Shut down in the case of interrupt and termination signals
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => server.close());
});
