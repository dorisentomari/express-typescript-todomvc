import fs from 'fs';
import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { connectDB, initSchema } from './db';
import Router from './routes';
import homeRoute from './routes/home';

const result = dotenv.config();
if (result.error) {
  throw new Error('dotenv config error');
}

const NODE_ENV = process.env.NODE_ENV.toUpperCase();

const envConfig = dotenv.parse(fs.readFileSync(`.env.${NODE_ENV.toLowerCase()}`));

for(let key in envConfig) {
  process.env[key] = envConfig[key];
}

(() => {
  initSchema();
  connectDB();
})();

const PORT = 8000;
/*
* TODO
*  路由： 用户注册，登录
*  数据表：用户数据表，todos 数据表，操作记录数据表
* */
const app = express();
const MongoStore = mongo(session);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { SECRET_SESSION, MONGODB_URL } = process.env;

app.use(session({
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

app.use('/', homeRoute);
app.use('/api/v1', Router);

app.listen(PORT, (err: Error) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
