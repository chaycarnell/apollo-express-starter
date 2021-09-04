import { Request, Response } from 'express';

export default {
  example: async (_: Request, res: Response) => {
    res.json({
      success: true,
      status: 200,
      message: 'example public response',
      data: {},
    });
  },
};
