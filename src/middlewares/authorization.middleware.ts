import {
  Request, Response, NextFunction
} from 'express';
import jwt from 'jsonwebtoken';

import constant from '../config/constant';
import { JwtTokenUserInterface } from '../interfaces/service/jwt.token';
import UserModel from '../db/schemas/user';
import WrongAuthorizationTokenException from '../exceptions/WrongAuthorizationTokenException';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { WHITE_LIST } = constant;
  const path = req.path;

  if (WHITE_LIST.includes(path)) {
    return next();
  }
  const headers = req.headers;

  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const authorization = headers.authorization;
      const verificationResponse = jwt.verify(authorization, secret) as JwtTokenUserInterface;
      const id = verificationResponse.id;
      const user = await UserModel.findById(id);
      if (user) {
        // @ts-ignore
        req.user = user;
        return next();
      } else {
        return next(new WrongAuthorizationTokenException());
      }
    } catch (e) {
      return next(new WrongAuthorizationTokenException());
    }
  } else {
    return next(new NotAuthorizedException());
  }
};

export default authorizationMiddleware;
