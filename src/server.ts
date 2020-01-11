import App from './app';
import AccountController from './controllers/account.controller';
import TodosController from './controllers/todos.controller';

const app = new App([
  new AccountController(),
  new TodosController()
]);

app.listen();
