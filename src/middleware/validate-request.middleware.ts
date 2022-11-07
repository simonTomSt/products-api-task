import type { Response, Request, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const validateRequest = (validators: ValidationChain[]) => [
  ...validators,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: {}, errors: errors.array() });
    }
  },
];
