import CommonSchemaInterface from './common.schema.interface';

interface TodosSchemaInterface extends CommonSchemaInterface {
  content: string;
  userId: string;
  status: string;
}

export default TodosSchemaInterface;
