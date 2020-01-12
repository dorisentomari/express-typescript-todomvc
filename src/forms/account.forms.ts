const minLength = 8;
const maxLength = 30;

const accountForms = {
  email: {
    notExist: 'email address is not exist',
    hasExist: 'email address has been used',
    formatError: 'email format is wrong'
  },
  password: {
    minLength: minLength,
    maxLength: maxLength,
    lengthMessage: `password length must be between ${minLength} and  ${maxLength}`
  },
  rePassword: {
    notSameMessage: 'twice input password is not same'
  },
  login: {
    userNotExist: 'user is not exist',
    accountError: 'username or password wrong'
  }
};

export default accountForms;
