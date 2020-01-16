import CommonSchemaInterface from './common.schema.interface';

export interface TodoStatusInterface {
  PENDING: 'PENDING';
  FINISHED: 'FINISHED';
  DELETED: 'DELETED';
}

interface TodosSchemaInterface extends CommonSchemaInterface {
  content: string;
  userId: string;
  status: TodoStatusInterface;
}

export default TodosSchemaInterface;
