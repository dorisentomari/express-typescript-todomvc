export enum RETURN_CODE {
  OK,
  ERROR
}

export interface RETURN_TYPE {
  code: RETURN_CODE;
  data?: any;
  errors?: string | object | Array<any>;
}

export interface PAGINATION {
  page: number;
  pageSize: number;
  total: number;
}

export interface RETURN_LIST_TYPE {
  code: RETURN_CODE;
  data: Array<any> | null;
  profile: PAGINATION
}
