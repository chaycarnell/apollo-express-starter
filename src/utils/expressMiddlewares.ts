import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import expressErrorHandler from './expressErrorHandler';
import expressLogger from './expressLogger';

const applyExpressMiddlewares = (
  app: express.Application,
  isProduction: boolean,
) => {
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
};

export default applyExpressMiddlewares;
