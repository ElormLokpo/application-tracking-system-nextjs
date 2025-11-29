import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../handlers"
import { CustomError } from "../utils";

export const errorMiddleware = (err:CustomError, req:Request, res:Response, next:NextFunction)=>{

    try{

        return new ResponseHandler(res).errorDataHandler(err.message);
    }catch(error){
        return next(error);
    }
}