const minContentLength = 2;
const maxContentLength = 256;

const todosForms = {
  content: {
    minLength: minContentLength,
    maxLength: maxContentLength,
    lengthMessage: `content length must be between ${minContentLength} and  ${maxContentLength}`
  }
};

export default todosForms;
