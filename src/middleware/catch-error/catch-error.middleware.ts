import type { Response, Request, NextFunction } from 'express';
import { HttpError } from '@utils/http-error';

export const catchErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      data: {},
      error: err.message,
    });
  } else {
    res
      .status(500)
      .json({ data: {}, error: err.message || 'Internal Server Error' });
  }

  next();
};
