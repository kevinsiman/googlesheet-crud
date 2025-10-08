export class BaseError extends Error {
  public readonly httpStatus: number;
  public readonly name: string;

  constructor(message: string, httpStatus: number = 500) {
    super(message);

    this.name = this.constructor.name;
    this.httpStatus = httpStatus;

    Error.captureStackTrace(this, this.constructor);
  }
}
