import express, {
  Request, Response, NextFunction
} from 'express';
import gravatar from 'gravatar';

import UserModel from '../db/schemas/user';

import Controller from '../interfaces/controller';
import validationMiddleware from '../middlewares/validator.middleware';
import { AccountRegisterValidator } from '../validators/account.validator';

class AccountController implements Controller {
  public path = '/account';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes () {
    this.router.post(`${this.path}/register`, validationMiddleware(AccountRegisterValidator), this.accountRegister);
  }

  private accountLogin (req: Request, res: Response, next: NextFunction) {

  }

  private async accountRegister (req: Request, res: Response) {
    const accountData: AccountRegisterValidator = req.body;
    const createdAccount = new UserModel({
      ...accountData,
      avatar: gravatar.url(accountData.email)
    });
    const savedAccount = await createdAccount.save();
    return res.send(savedAccount);
  }

}

export default AccountController;
