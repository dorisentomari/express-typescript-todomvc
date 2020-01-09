export enum RETURN_CODE {
  OK,
  ERROR
}

export interface TypeReturn {
  code: RETURN_CODE;
  data?: any;
  errors?: string | object | Array<any>;
}
