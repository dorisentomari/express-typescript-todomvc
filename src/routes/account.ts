import express from 'express';
import { validatorLogin, validatorRegister } from '../service/account';
import { checkValidatorResults } from '../middlewares/validator';

const accountRoute = express.Router();

accountRoute.post('/login', validatorLogin, checkValidatorResults, async (req, res) => {
  console.log('login ok');
  return res.json({});
});

accountRoute.post('/register', validatorRegister, checkValidatorResults, async (req, res) => {
  console.log('register ok');
  return res.json({});
});

export default accountRoute;
