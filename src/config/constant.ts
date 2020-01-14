export default {
  SALT_ROUNDS: 5,
  WHITE_LIST: [
    '/api/v1/account/login',
    '/api/v1/account/register',
    '/api/v1/account/exist/email',
    '/api/v1/account/update/password',
  ],
  PAGE: {
    PAGE_SIZE: 20
  },
  DANGER_FIELDS: ['deleted', 'disabled', '__v', '_id', 'createTime', 'updateTime'],
  HTTP_METHOD_MAP: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },
  JWT: {
    // 过期时间单位是秒
    EXPIRES_IN: 60
  }
};
