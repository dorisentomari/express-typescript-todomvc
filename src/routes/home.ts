import express from 'express';

const accountRoute = express.Router();

accountRoute.get('/', async (req, res) => {
  res.send('<h1>HELLO, TODOMVC. THIS IS A TEST PAGE.</h1>');
});

export default accountRoute;
