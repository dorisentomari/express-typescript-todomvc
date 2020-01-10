import {
  Request, Response, NextFunction
} from 'express';

import CONSTANT from '../constant';

export const safeFields = (req: Request, res: Response, next: NextFunction) => {
  const {
    DANGER_FIELDS, HTTP_METHOD_MAP: {
      GET, POST, PUT, DELETE 
    } 
  } = CONSTANT;

  let method = req.method.toUpperCase();

  const deleteUnsafeFields = (params: object) => {
    for(let key in params) {
      if (params.hasOwnProperty(key)) {
        if (DANGER_FIELDS.includes(key)) {
          delete params[key];
        }
      }
    }
  };

  switch (method) {
  case GET:
    deleteUnsafeFields(req.query);
    break;
  case POST || PUT || DELETE:
    deleteUnsafeFields(req.body);
    break;
  }
  next();
};
