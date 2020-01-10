import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';

import { validatorEmailExist, validatorLogin, validatorRegister, validatorPassword } from '../service/account';
import { checkValidatorResults } from '../middlewares/validator';
import UserModel from '../db/schemas/user';
import { RETURN_CODE, TypeReturn } from '../types/account';
import AccountForm from '../forms/account';

const accountRoute = express.Router();
const { login } = AccountForm;

accountRoute.post('/login', validatorLogin, checkValidatorResults, async (req, res) => {
  const { email, password } = req.body;
  let user: any = await UserModel.findOne({ email });
  let result:TypeReturn = {
    code: RETURN_CODE.OK
  };

  if (!user) {
    result = {
      code: RETURN_CODE.ERROR,
      errors: login.userNotExist
    };
    return res.json(result);
  }

  const isSame = bcrypt.compareSync(user.password, password);

  if (isSame) {
    result = {
      code: RETURN_CODE.OK
    };
    req.session.user = user;
  }
  return res.json(result);
});

accountRoute.post('/register', validatorRegister, checkValidatorResults, async (req, res) => {
  const { email, password } = req.body;
  let avatar = gravatar.url(email);
  let user = await UserModel.create({ email, password, avatar });
  res.json(user);
});

accountRoute.get('/exist/email', validatorEmailExist, checkValidatorResults, async (req, res) => {
  let result:TypeReturn = {
    code: RETURN_CODE.OK
  };
  return res.json(result);
});

accountRoute.post('/update/password', validatorPassword, checkValidatorResults, validatorEmailExist, async (req, res) => {
  let { email } = req.body;
  let user: any = await UserModel.findOne({ email });
});

export default accountRoute;
