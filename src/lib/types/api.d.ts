declare type DatabaseProperties = {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  passwordChangedAt?: string;
};

declare type ErrorResponse = {
  error: string;
};

declare type SuccessResponse<T> = {
  message: string;
} & T;

declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
} & T;

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
