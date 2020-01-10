export enum TODO_STATUS {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  ALL = 'ALL'
}

export interface IWriteTodos {
  content?: string;
  remark?: string;
}

export interface IReadTodos {
  userId?: string;
  status?: TODO_STATUS;
  content?: string;
  remark?: string;
  startTime?: object;
  endTime?: object;
}
