import HttpException from './HttpException';

class NotAuthorizedException extends HttpException {
  constructor() {
    super(403, 'Your\'re not authorized');
  }
}

export default NotAuthorizedException;
