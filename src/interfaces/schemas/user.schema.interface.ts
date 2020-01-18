import CommonSchemaInterface from './common.schema.interface';

interface UserSchemaInterface extends CommonSchemaInterface {
  username: string;
  password: string;
  email: string;
  avatar: string;
}

export default UserSchemaInterface;
