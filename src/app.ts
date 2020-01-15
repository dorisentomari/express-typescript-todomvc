import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import glob from 'glob';
import bluebird from 'bluebird';
import chalk from 'chalk';
import cors from 'cors';

import { ControllerInterface } from './interfaces/controller.interface';

import errorMiddleware from './middlewares/error.middleware';
import loggerMiddleware from './middlewares/logger.middleware';
import safeFieldsMiddleware from './middlewares/safeFields.middleware';
import authorizationMiddleware from './middlewares/authorization.middleware';

class App {
  public app: express.Application;

  constructor(controllers: ControllerInterface[]) {
    this.app = express();

    this.initEnvConfig();
    this.connectToMongoDB();
    this.initMiddlewaresBeforeControllers();
    this.initControllers(controllers);
    this.initMiddlewaresAfterControllers();
    this.initErrorHandler();
  }

  public listen() {
    const PORT = process.env.PORT;
    this.app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`server is running at http://localhost:${PORT}`);
      }
    });
  }

  public getServer() {
    return this.app;
  }

  private initEnvConfig () {
    const result = dotenv.config();
    if (result.error) {
      throw new Error('dotenv config error');
    }

    const NODE_ENV = process.env.NODE_ENV.toUpperCase();

    const envConfig = dotenv.parse(
      fs.readFileSync(path.resolve(__dirname, `../.env.${NODE_ENV.toLowerCase()}`))
    );

    for(let key in envConfig) {
      if (envConfig.hasOwnProperty(key)) {
        process.env[key] = envConfig[key];
      }
    }
  }

  private initMiddlewaresBeforeControllers() {

    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.use(loggerMiddleware.normalLogger);
    this.app.use(safeFieldsMiddleware);
    this.app.use(authorizationMiddleware);

  }

  private initMiddlewaresAfterControllers() {
    this.app.use(loggerMiddleware.errorLogger);
  }

  private initErrorHandler() {
    this.app.use(errorMiddleware);
  }

  private initControllers(controllers: ControllerInterface[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private initMongoSchemas() {
    glob
      .sync(path.resolve(__dirname, './db/schemas/', '**/*.ts'))
      .forEach(schema => import(schema));
  }

  private connectToMongoDB() {
    mongoose.Promise = bluebird.Promise;

    this.initMongoSchemas();

    const options = {
      useMongoClient: true,
      autoReconnect: true,
      poolSize: 10
    };

    mongoose.set('debug', true);

    mongoose.connect(process.env.MONGODB_URL, options, err => {
      if (err) {
        console.log(chalk['red']('连接 MongoDB 数据库出错'));
        console.log(err);
      } else {
        console.log(chalk['green']('MongoDB 数据库连接成功'));
      }
    });

    mongoose.connection.on('error', error => {
      console.log(chalk['red']('MongoDB 数据库出错'));
      console.log(error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB 数据库断开连接');
    });

    mongoose.connection.once('open', () => {
      console.log(chalk['green']('MongoDB 数据库已开启'));
    });
  }
}

export default App;
