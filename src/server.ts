import App from './app';
import HomeController from './controllers/home.controller';
import AccountController from './controllers/account.controller';
import TodosController from './controllers/todos.controller';

const app = new App([
  new HomeController({ path: '/' }),
  new AccountController({ path: '/api/v1/account' }),
  new TodosController({ path: '/api/v1/todos' })
]);

app.listen();
