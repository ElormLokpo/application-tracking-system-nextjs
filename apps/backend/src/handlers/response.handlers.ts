import { Response } from "express";

export class ResponseHandler {
  response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  successHandler(message: string) {
    this.response.status(200).json({
      success: true,
      message,
    });

    return this;
  }

  successDataHandler<T>(data: T, message: string) {
    this.response.status(200).json({
      success: true,
      message,
      data,
    });

    return this;
  }

  errorDataHandler(message: string) {
    this.response.status(200).json({
      success: false,
      message,
    });

    return this;
  }
}
