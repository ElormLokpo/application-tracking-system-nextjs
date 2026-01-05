import { StatusCodes } from "../../../../packages/types";

export class CustomError extends Error {
  statusCode: StatusCodes;
  constructor(statusCode: StatusCodes, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
