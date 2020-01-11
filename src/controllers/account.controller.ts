import express, { Request, Response } from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';

import UserModel from '../db/schemas/user';
import Controller from '../interfaces/controller';
import validationMiddleware from '../middlewares/validator.middleware';
import { AccountRegisterValidator, AccountLoginValidator } from '../validators/account.validator';
import constant from '../config/constant';

class AccountController implements Controller {
  public path = '/account';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes () {
    this.router.post(`${this.path}/logout`, this.accountLogout);
    this.router.post(`${this.path}/register`, validationMiddleware(AccountRegisterValidator), this.accountRegister);
    this.router.post(`${this.path}/login`, validationMiddleware(AccountLoginValidator), this.accountLogin);
  }

  private async accountRegister (req: Request, res: Response) {
    const accountData: AccountRegisterValidator = req.body;
    const {
      email, password, rePassword 
    } = accountData;

    if (password !== rePassword) {
      return res.status(400).send('两次输入的密码不一致');
    }

    const hasEmail  = await UserModel.findOne({ email });

    if (hasEmail) {
      return res.status(400).send('邮箱已被使用');
    }

    const salt = bcrypt.genSaltSync(constant.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    const createdAccount = new UserModel({
      email,
      password: hash,
      avatar: gravatar.url(email)
    });
    const savedAccount = await createdAccount.save();
    return res.send(savedAccount);
  }

  private async accountLogin (req: Request, res: Response) {
    const accountData: AccountLoginValidator = req.body;
    const { email, password: loginPassword } = accountData;

    const createdAccount = await UserModel.findOne({ email });

    if (!createdAccount) {
      return res.status(400).send('用户名或密码错误1');
    }

    const { password: bcryptPassword } = createdAccount;

    const isSame = bcrypt.compareSync(loginPassword, bcryptPassword);

    if (isSame) {
      req.session.user = {
        username: createdAccount.username,
        id: createdAccount._id,
        email: createdAccount.email
      };
      return res.status(200).send('登录成功');
    }
    return res.status(400).send('用户名或密码错误2');
  }

  private async accountLogout (req: Request, res: Response) {
    req.session.user = null;
    return res.status(200);
  }

}

export default AccountController;
