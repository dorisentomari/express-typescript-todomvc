import path from 'path';
import glob from 'glob';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import chalk from 'chalk';

mongoose.Promise = bluebird.Promise;

export const initSchema = () => {
  glob
    .sync(path.resolve(__dirname, './schemas/', '**/*.ts'))
    .forEach(schema => import(schema));
};

export const connectDB = () => {
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
};
