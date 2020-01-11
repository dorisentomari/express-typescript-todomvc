import HttpException from './HttpException';

class NoAuthorizationTokenException extends HttpException {
  constructor() {
    super(401, 'No Authorization Token');
  }
}

export default NoAuthorizationTokenException;
