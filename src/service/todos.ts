import { check } from 'express-validator';

import TodosForms from '../forms/todos';

const { content } = TodosForms;

export const validatorCreateTodo = [
  check('content')
    .isLength({
      min: content.minLength,
      max: content.maxLength 
    })
    .withMessage(content.lengthMessage)
];
