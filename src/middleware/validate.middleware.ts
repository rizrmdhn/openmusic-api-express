import type { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { ApiError } from '@/utils/ApiError';

export function validate(schemas: {
  params?: z.ZodType;
  query?: z.ZodType;
  body?: z.ZodType;
}) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as typeof req.params;
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as typeof req.query;
      }
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(z.flattenError(err));
        next(ApiError.badRequest('Validation failed', z.flattenError(err)));
        return;
      }
      next(err);
    }
  };
}
