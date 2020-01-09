import express from 'express';
import accountRoute from './account';

const Router = express.Router();

Router.use('/account', accountRoute);

export default Router;
