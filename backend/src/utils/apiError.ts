export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 500, code = "API_ERROR") {
    super(message);

    this.statusCode = statusCode;
    this.code = code;

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
