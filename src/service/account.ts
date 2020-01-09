import { check } from 'express-validator';

import AccountForm from '../forms/account';

const { username, password, rePassword } = AccountForm;

export const validatorLogin = [
  check('username')
    .isLength({ min: username.minLength })
    .withMessage(username.minLengthMessage)
    .isLength({ max: username.maxLength })
    .withMessage(username.maxLengthMessage),
  check('password')
    .isLength({ min: password.minLength })
    .withMessage(password.minLengthMessage)
    .isLength({ max: password.maxLength })
    .withMessage(password.maxLengthMessage),
];

export const validatorRegister = [
  ...validatorLogin,
  check('rePassword').custom((rePassword, { req }) => {
    const { password } = req.body;
    return password === rePassword;
  }).withMessage(rePassword.notSameMessage)
];
