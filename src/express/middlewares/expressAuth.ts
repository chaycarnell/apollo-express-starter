import { NextFunction, Request, Response } from 'express';

import { CustomExpressError } from '../../common/errors';
import { ErrorCodes } from '../../types/enums';
import logger from '../../utils/logger';

/**
 * Authenticates requests where an authorization header is present
 * @param req
 * @param res
 * @param next
 */
const authenticateRequest = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const isIntrospection = req.body.operationName === 'IntrospectionQuery';
    const token = req.headers.authorization;
    if (token) {
      // Replace, for example JWT + JWKS authentication
      if (token === process.env.SECRET) {
        req.user = { id: '1000' };
        req.authenticated = true;
        if (!isIntrospection) {
          logger.info(
            `[Express] Authorization success: LogTraceId ${req.logTraceId} | Operation ${req.method} | Route ${req.url} | User ${req.user.id}`,
          );
        }
        return next();
      }
      logger.error(
        `[Express] Authorization failed: LogTraceId ${req.logTraceId} | Operation ${req.method} | Route ${req.url}`,
      );
      throw new CustomExpressError(ErrorCodes.UNAUTHENTICATED);
    } else {
      req.user = undefined;
      req.authenticated = false;
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

export default authenticateRequest;
