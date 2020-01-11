import common from './common';

interface Todos extends common {
  content: string;
  userId: string;
  status: string;
}

export default Todos;
