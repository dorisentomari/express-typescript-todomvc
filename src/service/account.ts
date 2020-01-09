import { check } from 'express-validator';

import UserModel from '../db/schemas/user';
import AccountForm from '../forms/account';

const { password, rePassword, email: EmailForm } = AccountForm;

export const validatorEmail = [
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage(EmailForm.formatError)
];

export const validatorEmailExist = [
  ...validatorEmail,
  check('email')
    .custom(async (email) => {
      let result = await UserModel.findOne({ email });
      if (result) {
        return Promise.reject(EmailForm.hasExist);
      }
      return Promise.resolve();
    })
];

export const validatorLogin = [
  ...validatorEmail,
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
