export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => {
  return {
    success: true,
    data,
    ...(message && { message }),
  };
};

export const errorResponse = (error: string): ApiResponse => {
  return {
    success: false,
    error,
  };
};
