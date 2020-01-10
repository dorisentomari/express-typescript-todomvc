const minContentLength = 2;
const maxContentLength = 256;

export default {
  content: {
    minLength: minContentLength,
    maxLength: maxContentLength,
    lengthMessage: `content length must be between ${minContentLength} and  ${maxContentLength}`
  }
};
