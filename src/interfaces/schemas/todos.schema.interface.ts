import CommonSchemaInterface from './common.schema.interface';

export interface TodoStatusInterface {
  PENDING: 'PENDING';
  FINISHED: 'FINISHED';
}

interface TodosSchemaInterface extends CommonSchemaInterface {
  content: string;
  userId: string;
  status: TodoStatusInterface;
}

export default TodosSchemaInterface;
