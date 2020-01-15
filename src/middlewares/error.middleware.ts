import {
  NextFunction, Request, Response 
} from 'express';
import HttpException from '../exceptions/http.exception';

const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Server Error';
  return response.status(status).json({ message, status });
};

export default errorMiddleware;
