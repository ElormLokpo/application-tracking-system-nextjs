import { NextFunction, Request, Response } from "express";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { loginUser, registerUser } from "../services/auth.service";
import { CustomError } from "../utils/customError";
import { ResponseHandler } from "../handlers/response.handlers";

export const registerController = async (req:Request<{},{},RegisterDto>, res:Response, next:NextFunction)=>{
    const token = await registerUser(req.body as RegisterDto);

    if(token instanceof CustomError){
        return next(token);
    }

    return new ResponseHandler(res).successDataHandler(token, "User registered successfully");
}


export const loginController = async (req:Request<{},{},LoginDto>, res:Response, next:NextFunction)=>{
    const token = await loginUser(req.body as LoginDto);

    if(token instanceof CustomError){
        return next(token);
    }

    return new ResponseHandler(res).successDataHandler(token, "User logged in successfully");
}