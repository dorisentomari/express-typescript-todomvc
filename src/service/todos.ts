import { check } from 'express-validator';
import TodosModel from '../db/schemas/todos';

import TodosForms from '../forms/todos';
import { validatorObjectId } from './account';

const { content } = TodosForms;

export const validatorCreateTodo = [
  check('content')
    .isLength({
      min: content.minLength,
      max: content.maxLength 
    })
    .withMessage(content.lengthMessage)
];
