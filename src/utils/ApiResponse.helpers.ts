import type { Response } from 'express';
import type { ApiMeta } from '@/utils/ApiResponse';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  options: {
    message?: string;
    statusCode?: number;
    meta?: ApiMeta;
  } = {}
) => {
  const { message = 'Success', statusCode = 200, meta } = options;

  return res.status(statusCode).json({
    success: true,
    status: 'success',
    statusCode,
    message,
    data,
    ...(meta && { meta }),
  });
};

export const sendError = (
  res: Response,
  options: {
    message?: string;
    statusCode?: number;
    errors?: Record<string, unknown>;
    stack?: string;
  } = {}
) => {
  const {
    message = 'Something went wrong',
    statusCode = 500,
    errors,
    stack,
  } = options;

  return res.status(statusCode).json({
    success: false,
    status: 'fail',
    statusCode,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && stack && { stack }),
  });
};
