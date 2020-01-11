import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import mongo from 'connect-mongo';
import glob from 'glob';
import bluebird from 'bluebird';
import chalk from 'chalk';

import Controller from './interfaces/controller';

import errorMiddleware from './middlewares/error.middleware';
import loggerMiddleware from './middlewares/logger.middleware';
import safeFields from './middlewares/safeFields.middleware';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
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
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.use(loggerMiddleware.normalLogger);
    this.app.use(safeFields);

    const { SECRET_SESSION, MONGODB_URL } = process.env;
    const MongoStore = mongo(session);

    this.app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: SECRET_SESSION,
      store: new MongoStore({
        url: MONGODB_URL,
        autoReconnect: true,
        collection: 'todos_sessions',
        ttl: 7 * 24 * 60 * 60
      })
    }));
  }

  private initMiddlewaresAfterControllers() {
    this.app.use(loggerMiddleware.errorLogger);
  }

  private initErrorHandler() {
    this.app.use(errorMiddleware);
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/api/v1', controller.router);
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
