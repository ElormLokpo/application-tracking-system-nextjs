import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../handlers"

export const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    return new ResponseHandler(res).errorDataHandler(err.message);
}