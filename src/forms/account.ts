const minLength = 8;
const maxLength = 16;
const vCodeLength = 6;
const emailMaxLength = 30;

export default {
  username: {
    minLength: minLength,
    maxLength: maxLength,
    lengthMessage: `username length must be between ${minLength} and  ${maxLength}`
  },
  password: {
    minLength: minLength,
    maxLength: maxLength,
    lengthMessage: `password length must be between ${minLength} and  ${maxLength}`
  },
  rePassword: {
    notSameMessage: 'twice input password is not same'
  },
  vCode: {
    minLength: vCodeLength,
    maxLength: vCodeLength,
    lengthMessage: `vCode length must be ${vCodeLength}`
  },
  email: {
    minLength: minLength,
    maxLength: emailMaxLength,
    lengthMessage: `email length must be between ${minLength} and  ${emailMaxLength}`,
    notExist: 'email address is not exist',
    hasExist: 'email address has been used',
    formatError: 'email format is wrong'
  },
  login: {
    userNotExist: 'user is not exist',
    accountError: 'username or password wrong'
  },
  mongoId: {
    formatError: 'mongo id format is wrong'
  }
};
