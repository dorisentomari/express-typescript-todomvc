import { Router } from 'express';

export interface ControllerInterface {
  path: string;
  router: Router;
}

export interface ControllerConstructorInterface {
  path: string;
}
