import CommonSchemaInterface from './common.schema.interface';

export enum TodoStatusInterface {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  DELETED = 'DELETED'
}

export interface TodosSchemaInterface extends CommonSchemaInterface {
  content: string;
  userId: string;
  status: TodoStatusInterface;
}

