import HttpException from './HttpException';

class WrongAuthorizationTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong authorization token');
  }
}

export default WrongAuthorizationTokenException;
