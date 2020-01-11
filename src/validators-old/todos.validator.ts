import { check } from 'express-validator';

import todosForms from '../forms/todos.forms';

const { content } = todosForms;

export const validatorCreateTodo = [
  check('content')
    .isLength({
      min: content.minLength,
      max: content.maxLength
    })
    .withMessage(content.lengthMessage)
];
