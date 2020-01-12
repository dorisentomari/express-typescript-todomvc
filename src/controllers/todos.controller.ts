import express, { Request, Response } from 'express';

import Controller from '../interfaces/controller';

import TodosModel from '../db/schemas/todos';
import validationMiddleware from '../middlewares/validator.middleware';
import { TodosCreateUpdateValidator } from '../validators/todos.validator';

import constant from '../config/constant';

const { PAGE: { PAGE_SIZE } } = constant;

class TodosController implements Controller {
  public path = '/todos';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes () {
    this.router.post(`${this.path}/create`, validationMiddleware(TodosCreateUpdateValidator), this.todosCreate);
    this.router.post(`${this.path}/:id/update`, validationMiddleware(TodosCreateUpdateValidator), this.todosUpdate);
    this.router.post(`${this.path}/:id/delete`, this.todosDelete);
    this.router.get(`${this.path}/list`, this.todosList);
  }

  private async todosCreate (req: Request, res: Response) {
    const todosData: TodosCreateUpdateValidator = req.body;
    const { content, remark } = todosData;
    const user = req.session.user;
    const createdTodos = new TodosModel({
      content,
      remark,
      userId: user.id
    });
    const savedTodos = await createdTodos.save();
    return res.send(savedTodos);
  }

  private async todosUpdate (req: Request, res: Response) {
    const todosData: TodosCreateUpdateValidator = req.body;
    const { content, remark } = todosData;
    const { id } = req.params;

    const updatedTodos = await TodosModel.findByIdAndUpdate(id, {
      content,
      remark
    });
    if (updatedTodos) {
      return res.status(200);
    }
    res.status(400).json({
      message: '数据不存在'
    });
  }

  private async todosDelete (req: Request, res: Response) {
    const { id } = req.params;

    const updatedTodos = await TodosModel.findByIdAndRemove(id);

    if (updatedTodos) {
      return res.status(200);
    }
    return res.status(400).json({
      message: '数据不存在'
    });
  }

  private async todosList (req: Request, res: Response) {
    const { page = 1 } = req.query;
    const todosList = await TodosModel.find().sort({ _id: -1 }).skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    let dbCount = await TodosModel.find({ deleted: false }).count();

    return res.status(200).json({
      data: todosList,
      profile: {
        page: page,
        pageSize: PAGE_SIZE,
        total: dbCount
      }
    });
  }

}

export default TodosController;
