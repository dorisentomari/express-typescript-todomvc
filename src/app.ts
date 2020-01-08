import * as express from 'express';
import * as bodyParser from 'body-parser';

const PORT = 8000;
/*
* TODO
*  路由： 用户注册，登录
*  数据表：用户数据表，todos 数据表，操作记录数据表
* */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
