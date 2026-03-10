export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

interface SuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  meta?: ApiMeta;
}

interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  stack?: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
