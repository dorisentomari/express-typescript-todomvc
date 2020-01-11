import jwt from 'jsonwebtoken';

import { JwtTokenInterface, JwtTokenUserInterface } from '../interfaces/service/jwt.token';

import constant from '../config/constant';

const { JWT } = constant;

class AuthorizationService {

  public createCookie(tokenData: JwtTokenInterface) {
    return `Authorization=${tokenData.token};HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public createToken(user: JwtTokenUserInterface): JwtTokenInterface {
    const expiresIn = JWT.EXPIRES_IN;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(user, secret, { expiresIn });
    return {
      token,
      expiresIn
    };
  }

}

export default AuthorizationService;
