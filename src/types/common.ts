export type ErrorMessage = {
  path: string;
  message: string;
};

export type ErrorApiResponseType = {
  success: boolean;
  message: string;
  errorMessages: ErrorMessage[];
};

export type ApiResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};
