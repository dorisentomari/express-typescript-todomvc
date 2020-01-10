import express from 'express';

const homeRoute = express.Router();

homeRoute.get('/', async (req, res) => {
  res.send('<h1>HELLO, TODOMVC. THIS IS A TEST PAGE.</h1>');
});



export default homeRoute;
