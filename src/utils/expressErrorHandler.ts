import { NextFunction, Request, Response } from 'express';

import { getError } from '../common/errors';
import logger from './logger';

const expressErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  __: NextFunction,
) => {
  logger.error(`Error encountered: LogTraceId ${req.logTraceId}`, {
    error,
  });
  const formattedError = getError(error.errorCode);
  res.status(formattedError.status).send(formattedError);
};

export default expressErrorHandler;
