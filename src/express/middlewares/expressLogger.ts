import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { BaseServerRoutes } from '../../types/enums';
import logger from '../../utils/logger';

const expressLogger = (req: Request, res: Response, next: NextFunction) => {
  // Generate log trace ID for all requests which can be used in GraphQL request context
  req.logTraceId = uuidv4();
  // Only log non-graphql requests here
  if (req.url !== BaseServerRoutes.GRAPHQL) {
    logger.info(
      `[Express] New request: LogTraceId ${req.logTraceId} | Operation ${req.method} | Route ${req.url}`,
    );
    res.on('finish', () => {
      logger.info(`[Express] End request: LogTraceId ${req.logTraceId}`);
    });
  }
  return next();
};

export default expressLogger;
