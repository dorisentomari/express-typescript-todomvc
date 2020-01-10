import {
  Request, Response, NextFunction
} from 'express';

import CONSTANT from '../constant';

import { RETURN_CODE } from '../types/account';

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;

  if (CONSTANT.whiteList.includes(path)) {
    return next();
  }
  if (req.session.user) {
    return next();
  }
  return res.status(403).json({
    code: RETURN_CODE.ERROR,
    errors: CONSTANT.notLoginMsg 
  });
};
