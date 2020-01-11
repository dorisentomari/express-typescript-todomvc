const minContentLength = 2;
const maxContentLength = 256;
const maxRemarkLength = 1024;

const todosForms = {
  content: {
    minLength: minContentLength,
    maxLength: maxContentLength,
    lengthMessage: `content length must be between ${minContentLength} and  ${maxContentLength}`
  },
  remark: {
    minLength: minContentLength,
    maxLength: maxRemarkLength,
    lengthMessage: `remark length must be between ${minContentLength} and  ${maxRemarkLength}`
  }
};

export default todosForms;
