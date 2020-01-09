const minLength = 8;
const maxLength = 16;

export default {
  username: {
    minLength: minLength,
    minLengthMessage: `username min length is ${minLength}`,
    maxLength: maxLength,
    maxLengthMessage: `username max length is ${maxLength}`
  },
  password: {
    minLength: minLength,
    minLengthMessage: `password min length is ${minLength}`,
    maxLength: maxLength,
    maxLengthMessage: `password max length is ${maxLength}`
  },
  rePassword: {
    notSameMessage: 'twice input password is not same'
  }
};
