import { check } from 'express-validator';

import commonForms from '../forms/common.forms';

const { mongoId } = commonForms;

export const validatorObjectId = [
  check('id')
    .isMongoId()
    .withMessage(mongoId.formatError)
];
