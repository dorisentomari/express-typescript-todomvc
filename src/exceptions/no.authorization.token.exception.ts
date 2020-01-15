import HttpException from './http.exception';

class NoAuthorizationTokenException extends HttpException {
  constructor() {
    super(401, 'No Authorization Token');
  }
}

export default NoAuthorizationTokenException;
