import { Request, Response, NextFunction } from 'express';
import { environment } from '~/config';
import { ApiError, ErrorType, InternalError } from "~/utils/ApiError";
import Logger from "~/utils/Logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log('mdw is running...');
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    Logger.error(err);
    if (environment === 'development') {
      console.log(err)
    }
    ApiError.handle(new InternalError(), res);
  }
};
