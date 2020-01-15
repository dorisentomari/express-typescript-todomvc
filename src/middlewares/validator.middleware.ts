import {
  Request, Response, NextFunction, RequestHandler 
} from 'express';

import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import HttpException from '../exceptions/http.exception';

import constant from '../config/constant';

function validationMiddleware<T>(type: any, skipMissingProperties = false):RequestHandler {
  return (req:Request, res: Response, next: NextFunction) => {
    const {
      HTTP_METHOD_MAP: {
        GET, POST, PUT, DELETE
      }
    } = constant;

    let method = req.method.toUpperCase();
    let validateParams = {};

    switch (method) {
    case GET:
      validateParams = req.query;
      break;
    case POST || PUT || DELETE:
      validateParams = req.body;
      break;
    }
    validate(plainToClass(type, validateParams), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          next(new HttpException(400, errors));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware;
