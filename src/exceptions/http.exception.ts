class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, errors: any) {
    super(errors);
    this.status = status;
    this.message = errors;
  }
}

export default HttpException;
