import express from 'express';
import TodosModel from '../db/schemas/todos';

import { validatorObjectUserId, validatorObjectId } from '../service/account';
import { validatorCreateTodo } from '../service/todos';
import { checkValidatorResults } from '../middlewares/validator';
import {
  RETURN_CODE, RETURN_LIST_TYPE, RETURN_TYPE
} from '../types/account';
import {
  IWriteTodos, IReadTodos, TODO_STATUS 
} from '../types/todos';
import CONSTANT from '../constant';

const todosRoute = express.Router();
const { PAGE: { PAGE_SIZE } } = CONSTANT;
const todoNotExist = 'this todo is not exist';
const todoParamBothEmpty = 'content or remark cannot be empty at same time';

todosRoute.get('/todos/:userId/list',
  validatorObjectUserId,
  checkValidatorResults,
  async (req, res) => {

    const { userId } = req.params;

    const {
      status, startTime, endTime, content, remark 
    } = req.query;

    let params: IReadTodos = {
      userId
    };

    if (status) {
      params.status = status;
    }

    if (content) {
      params.content = content;
    }

    if (remark) {
      params.remark = remark;
    }

    if (startTime) {
      params.startTime = {
        $lte: new Date(startTime).toISOString()
      };
    }

    if (endTime) {
      params.endTime = {
        $gte: new Date(endTime).toISOString()
      };
    }
    console.log(params);

    let dbResult = await TodosModel.find(params);

    return res.json(dbResult);
  });

todosRoute.post('/todos/create',
  validatorCreateTodo,
  checkValidatorResults,
  async (req, res) => {
    const { content, remark } = req.body;

    let params: IWriteTodos = {};

    if (content) {
      params.content = content;
    }

    if (remark) {
      params.remark = remark;
    }
    console.log('params');
    console.log(params);
    let result: RETURN_TYPE = {
      code: RETURN_CODE.ERROR
    };

    if (Object.keys(params).length === 0) {
      result.errors = todoParamBothEmpty;
      return res.status(422).json(result);
    }

    let user = req.session.user;

    let dbResult = await TodosModel.create({
      content,
      userId: user.id
    });

    result.code = RETURN_CODE.ERROR;

    if (dbResult) {
      result.code = RETURN_CODE.OK;
    }

    return res.json(result);
  }
);

todosRoute.post('/todos/:id/update',
  validatorObjectId,
  checkValidatorResults,
  async (req, res) => {
    const { id } = req.params;

    const { content, remark } = req.body;

    let params: IWriteTodos = {};

    if (content) {
      params.content = content;
    }

    if (remark) {
      params.remark = remark;
    }

    let result: RETURN_TYPE = {
      code: RETURN_CODE.ERROR
    };

    if (Object.keys(params).length === 0) {
      result.errors = todoParamBothEmpty;
      return res.status(422).json(result);
    }

    let dbResult: any = await TodosModel.findById(id);

    if (!dbResult || dbResult.deleted) {
      result.errors = todoNotExist;
      return res.json(result);
    }

    dbResult = await TodosModel
      .update({
        _id: id
      }, params);

    if (dbResult) {
      result.code = RETURN_CODE.OK;
    }
    return res.json(result);
  });

todosRoute.post('/todos/:id/delete',
  validatorObjectId,
  checkValidatorResults,
  async (req, res) => {
    const { id } = req.params;
    let result: RETURN_TYPE = {
      code: RETURN_CODE.ERROR
    };

    let dbResult: any = await TodosModel.findById(id);

    if (!dbResult || dbResult.deleted) {
      result.errors = todoNotExist;
      return res.json(result);
    }

    dbResult = await TodosModel
      .update({
        _id: id
      }, {
        deleted: true
      });

    if (dbResult) {
      result.code = RETURN_CODE.OK;
    }

    return res.json(result);
  });

todosRoute.post('/todos/:id/finish',
  validatorObjectId,
  checkValidatorResults,
  async (req, res) => {
    const { id } = req.params;
    let result: RETURN_TYPE = {
      code: RETURN_CODE.ERROR
    };

    let dbResult: any = await TodosModel.findById(id);

    if (!dbResult || dbResult.deleted) {
      result.errors = todoNotExist;
      return res.json(result);
    }

    dbResult = await TodosModel
      .update({
        _id: id
      }, {
        status: TODO_STATUS.FINISHED
      });

    if (dbResult) {
      result.code = RETURN_CODE.OK;
    }

    return res.json(result);
  });

// TODO 使用数据库的聚合查询效率会更高
// 查询全部list，通过 status 参数查询不同状态的 todo
todosRoute.get('/todos/list',
  async (req, res) => {
    const { page = 1, status } = req.query;

    let dbResult = await TodosModel
      .find({
        deleted: false,
        status
      })
      .sort({
        _id: -1
      })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    let dbCount = await TodosModel
      .find({
        deleted: false
      })
      .count();

    let result: RETURN_LIST_TYPE = {
      code: RETURN_CODE.ERROR,
      data: dbResult,
      profile: {
        page: page,
        pageSize: PAGE_SIZE,
        total: dbCount
      }
    };

    return res.json(result);
  });

export default todosRoute;
