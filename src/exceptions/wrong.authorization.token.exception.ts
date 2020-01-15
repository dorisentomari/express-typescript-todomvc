import HttpException from './http.exception';

class WrongAuthorizationTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong authorization token');
  }
}

export default WrongAuthorizationTokenException;
