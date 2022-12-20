export type BaseResponse = {
  code: number;
  success: number;
  message: string;
  errors: ErrorResponse[];
};

export type ErrorResponse = {
  code: number;
  message: string;
};
