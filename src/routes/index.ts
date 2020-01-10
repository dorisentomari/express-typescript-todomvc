import express from 'express';
import accountRoute from './account';
import todosRoute from './todos';

const Router = express.Router();

Router.use('/', accountRoute);
Router.use('/', todosRoute);

export default Router;
