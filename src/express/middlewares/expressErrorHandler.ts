import { NextFunction, Request, Response } from 'express';

import { CustomExpressError, errorTypes, getError } from '../../common/errors';
import logger from '../../utils/logger';

const expressErrorHandler = (
  error: CustomExpressError | Error | unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(`[Express] Error encountered: LogTraceId ${req.logTraceId}`, {
    error,
  });
  if (error instanceof CustomExpressError) {
    const formattedError = getError(error.errorCode);
    res.status(formattedError.status).send(formattedError);
    return;
  }
  res.status(errorTypes.UNKNOWN.status).send(errorTypes.UNKNOWN);
};

export default expressErrorHandler;
