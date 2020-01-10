import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';

import {
  validatorEmailExist,
  validatorLogin,
  validatorRegister,
  validatorUpdatePassword
} from '../service/account';

import { checkValidatorResults } from '../middlewares/validator';

import UserModel from '../db/schemas/user';

import { RETURN_CODE, RETURN_TYPE } from '../types/account';

import AccountForm from '../forms/account';
import CONSTANT from '../constant';

const accountRoute = express.Router();

const { login } = AccountForm;

accountRoute.post('/account/login',
  validatorLogin,
  checkValidatorResults,
  async (req, res) => {
    const { email, password } = req.body;
    let user: any = await UserModel.findOne({
      email 
    });
    let result:RETURN_TYPE = {
      code: RETURN_CODE.OK 
    };

    if (!user) {
      result = {
        code: RETURN_CODE.ERROR,
        errors: login.userNotExist 
      };
      return res.json(result);
    }

    const isSame = bcrypt.compareSync(password, user.password);

    if (isSame) {
      result = {
        code: RETURN_CODE.OK 
      };
      req.session.user = user;
    }

    return res.json(result);
  });

accountRoute.post('/account/register',
  validatorRegister,
  checkValidatorResults,
  async (req, res) => {
    const { email, password } = req.body;
    let avatar = gravatar.url(email);
    let user = await UserModel.create({
      email, password, avatar 
    });
    res.json(user);
  });

accountRoute.get('/account/exist/email',
  validatorEmailExist,
  checkValidatorResults,
  async (req, res) => {
    let result:RETURN_TYPE = {
      code: RETURN_CODE.OK 
    };
    return res.json(result);
  });

accountRoute.post('/account/update/password',
  validatorUpdatePassword,
  checkValidatorResults,
  async (req, res) => {
    let { email } = req.body;
    let user: any = await UserModel.findOne({
      email 
    });
    const newPassword = bcrypt.hashSync(
      user.password,
      CONSTANT.SAFE_WORK_FACTOR
    );
    let dbResult = await UserModel.updateOne({
      email 
    }, {
      password: newPassword 
    });
    let result: RETURN_TYPE = {
      code: RETURN_CODE.ERROR 
    };
    if (dbResult.ok === RETURN_CODE.OK) {
      result.code = RETURN_CODE.OK;
    }
    return res.json(result);
  });

export default accountRoute;
