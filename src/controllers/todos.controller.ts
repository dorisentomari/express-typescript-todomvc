import express, { Request, Response } from 'express';

import TodosModel from '../db/schemas/todos.schema';
import constant from '../config/constant';

import validationMiddleware from '../middlewares/validator.middleware';
import { TodosCreateUpdateValidator } from '../validators/todos.validator';

import { ControllerInterface, ControllerConstructorInterface } from '../interfaces/controller.interface';
import { TodosSchemaInterface, TodoStatusInterface } from '../interfaces/schemas/todos.schema.interface';

const { PAGE: { PAGE_SIZE } } = constant;

class TodosController implements ControllerInterface {
  public path;
  public router = express.Router();

  constructor({ path }: ControllerConstructorInterface) {
    this.path = path;
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

    const createdTodos = new TodosModel({
      content,
      remark,
      userId: req.user.id,
      status: TodoStatusInterface.PENDING
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
      return res.send(200);
    }
    res.status(400).json({
      message: '数据不存在'
    });
  }

  private async todosDelete (req: Request, res: Response) {
    const { id } = req.params;

    const updatedTodos = await TodosModel.findByIdAndRemove(id);

    if (updatedTodos) {
      return res.send(200);
    }
    return res.status(400).json({
      message: '数据不存在'
    });
  }

  private async todosList (req: Request, res: Response) {
    let { page = 1, pageSize = PAGE_SIZE } = req.query;
    page = Number(page);
    pageSize = Number(pageSize);
    const todosList = await TodosModel.find().sort({ _id: -1 }).skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    let dbCount = await TodosModel.find({ deleted: false }).count();

    return res.status(200).json({
      data: todosList,
      profile: {
        page,
        pageSize,
        total: dbCount
      }
    });
  }

}

export default TodosController;
