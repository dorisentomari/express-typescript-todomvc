import express from 'express';

import Controller from '../interfaces/controller';

import UserModel from '../db/schemas/user';
import TodosModel from '../db/schemas/todos';

class TodosController implements Controller {
  public path = '/account';
  public router = express.Router();
  private userModel = UserModel;
  private todoModel = TodosModel;

  constructor() {
    this.initRoutes();
  }

  private initRoutes () {

  }

}

export default TodosController;
