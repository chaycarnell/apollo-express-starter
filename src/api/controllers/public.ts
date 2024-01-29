import { NextFunction, Request, Response } from 'express';

export default {
  example: async (
    _request: Request,
    res: Response,
    __nextFunction: NextFunction,
  ) => {
    res.json({
      success: true,
      status: 200,
      message: 'example public response',
      data: {},
    });
  },
};
