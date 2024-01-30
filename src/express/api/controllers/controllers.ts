import { NextFunction, Request, Response } from 'express';

import { CustomExpressError } from '../../../common/errors';
import { ErrorCodes } from '../../../types/enums';

export default {
  public: async (_req: Request, res: Response, _next: NextFunction) => {
    res.json({
      success: true,
      status: 200,
      message: 'example public response',
      data: {},
    });
  },
  protected: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.authenticated) {
        res.json({
          success: true,
          status: 200,
          message: 'example private response',
          data: {
            userId: req.user?.id,
          },
        });
      } else {
        throw new CustomExpressError(ErrorCodes.UNAUTHENTICATED);
      }
    } catch (err) {
      return next(err);
    }
  },
};
