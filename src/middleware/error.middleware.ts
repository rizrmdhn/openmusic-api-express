import type { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

import { ApiError } from '@/utils/ApiError';
import { sendError } from '@/utils/ApiResponse.helpers';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Zod validation errors
  if (err instanceof ZodError) {
    sendError(res, {
      statusCode: 400,
      message: 'Validation failed',
      errors: z.treeifyError(err),
    });
    return;
  }

  // Known operational errors
  if (err instanceof ApiError && err.isOperational) {
    sendError(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
    return;
  }

  // Unknown / programmer errors — don't leak details
  // console.error('[Unhandled Error]', err);
  sendError(res, {
    statusCode: 500,
    message: 'Internal server error',
    stack: err.stack,
  });
};
