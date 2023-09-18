import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

type IApiResponseForCreate<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

// response for create
const sendResponseForCreate = <T>(
  res: Response,
  data: IApiResponseForCreate<T>,
): void => {
  const responseData: IApiResponseForCreate<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export const responseForData = {
  sendResponseForCreate,
  sendResponse,
};
