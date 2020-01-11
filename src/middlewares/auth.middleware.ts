import {
  Request, Response, NextFunction
} from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

import constant from '../config/constant';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;

  if (constant.whiteList.includes(path)) {
    return next();
  }

  if (req.session.user) {
    return next();
  }

  return res.status(401).send('Your\'re not authorized');
};

export default auth;
