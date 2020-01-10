import { check } from 'express-validator';

import UserModel from '../db/schemas/user';
import AccountForm from '../forms/account';

const {
  password,
  rePassword,
  email: EmailForm,
  vCode,
  mongoId 
} = AccountForm;

export const validatorEmail = [
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage(EmailForm.formatError)
    .isLength({
      min: EmailForm.minLength,
      max: EmailForm.maxLength 
    }).withMessage(EmailForm.lengthMessage)
];

export const validatorEmailExist = [
  ...validatorEmail,
  check('email')
    .custom(async (email, { req }) => {
      let result: any = await UserModel.findOne({
        email 
      });
      if (result) {
        req.vData = result._doc;
        return Promise.reject(EmailForm.hasExist);
      }
      return Promise.resolve();
    })
];

export const validatorEmailExistUse = [
  ...validatorEmail,
  check('email')
    .custom(async (email, { req }) => {
      let result: any = await UserModel.findOne({
        email 
      });
      if (result) {
        req.vData = result._doc;
        return Promise.resolve();
      }
      return Promise.reject(EmailForm.notExist);
    })
];

export const validatorPassword = [
  check('password')
    .isLength({
      min: password.minLength,
      max: password.maxLength 
    })
    .withMessage(password.lengthMessage)
];

export const validatorRePassword = [
  check('rePassword').custom((rePassword, { req }) => {
    const { password } = req.body;
    return password === rePassword;
  }).withMessage(rePassword.notSameMessage)
];

export const validatorVCode = [
  check('vCode').isLength({
    min: vCode.minLength,
    max: vCode.maxLength 
  }).withMessage(vCode.lengthMessage)
];

export const validatorLogin = [
  ...validatorEmail,
  ...validatorPassword
];

export const validatorRegister = [
  ...validatorEmailExist,
  ...validatorPassword,
  ...validatorRePassword
];

export const validatorUpdatePassword = [
  ...validatorPassword,
  ...validatorEmailExistUse,
  ...validatorVCode
];

export const validatorObjectUserId = [
  check('userId')
    .isMongoId()
    .withMessage(mongoId.formatError)
];

export const validatorObjectId = [
  check('id')
    .isMongoId()
    .withMessage(mongoId.formatError)
];
