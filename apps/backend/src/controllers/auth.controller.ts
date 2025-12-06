import { NextFunction, Request, Response } from "express";
import { LoginDto, RegisterDto } from "../dtos";
import { loginUser, registerUser, sendPasswordResetOtp, updateUserPassword, validateOtp } from "../services";
import { CustomError } from "../utils/";
import { ResponseHandler } from "../handlers";

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


export const sendPasswordResetOtpController = async (req:Request, res:Response, next:NextFunction)=>{
    await sendPasswordResetOtp(req.body.email as string);

   

    return new ResponseHandler(res).successDataHandler(true, "Otp sent successfully");
}

export const validateOtpController = async (req:Request, res:Response, next:NextFunction)=>{
    const otpValidated = await validateOtp(req.body.email, req.body.otp);

 
    return new ResponseHandler(res).successDataHandler(otpValidated, "Otp validated successfully");
}


export const updateUserPasswordController = async (req:Request, res:Response, next:NextFunction)=>{
    const user = await updateUserPassword(req.body.email, req.body.password);


    return new ResponseHandler(res).successDataHandler(user, "Password updated successfully");
}