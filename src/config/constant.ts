export default {
  SALT_ROUNDS: 5,
  whiteList: [
    '/api/v1/account/login',
    '/api/v1/account/register',
    '/api/v1/account/exist/email',
    '/api/v1/account/update/password',
  ],
  notLoginMsg: 'you didn\'t login, please login first',
  PAGE: {
    PAGE_SIZE: 20
  },
  DANGER_FIELDS: ['deleted', 'disabled', '__v', '_id', 'createTime', 'updateTime'],
  HTTP_METHOD_MAP: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  }
};
