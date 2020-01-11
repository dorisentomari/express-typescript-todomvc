import {
  Request, Response, NextFunction, RequestHandler 
} from 'express';

// @ts-ignore
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import HttpException from '../exceptions/HttpException';

function validationMiddleware<T>(type: any, skipMissingProperties = false):RequestHandler {
  return (req:Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          // const message = errors.map((error:ValidationError) => Object.values(error.constraints)).flat(1);
          next(new HttpException(400, errors));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware;
