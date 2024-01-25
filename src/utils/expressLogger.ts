import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { BaseServerRoutes } from '../types/enums';
import logger from './logger';

const expressLogger = (req: Request, res: Response, next: NextFunction) => {
  // Generate log trace ID for all requests which can be used in GraphQL request context
  req.logTraceId = uuidv4();
  // Set log trace ID on response headers
  res.setHeader('x-log-trace-id', req.logTraceId);
  // Only log non-graphql requests here
  if (req.url !== BaseServerRoutes.GRAPHQL) {
    logger.info(
      `New request: LogTraceId ${req.logTraceId} | Operation ${req.method} | Route ${req.url}`,
    );
    res.on('finish', () => {
      logger.info(`Completed request: LogTraceId ${req.logTraceId}`);
    });
  }
  next();
};

export default expressLogger;
