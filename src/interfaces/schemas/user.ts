import common from './common';

interface User extends common {
  username: string;
  password: string;
  email: string;
  avatar:string;
}

export default User;
