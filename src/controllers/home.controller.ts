import express, { Request, Response } from 'express';

import { ControllerInterface } from '../interfaces/controller.interface';

class HomeController implements ControllerInterface {
  public path;
  public router = express.Router();

  constructor({ path }) {
    this.path = path;
    this.initRoutes();
  }

  private initRoutes () {
    this.router.get(`${this.path}`, this.homePage);
  }

  private homePage (req: Request, res: Response) {
    return res.send('<h1>hello, Home Page</h1>');
  }

}

export default HomeController;
