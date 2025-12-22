import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils";
import { verifyToken } from "../utils";
import { Role, StatusCodes } from "../../../../packages/types";


export const AuthTokenMiddleware = async (req:any, res:Response, next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return next(new CustomError(StatusCodes.UNAUTHORIZED, "Token is required"));
    }
    const decodedToken:any = await verifyToken(token);
    if(!decodedToken){
        return next(new CustomError(StatusCodes.UNAUTHORIZED, "Invalid token"));
    }
    req.role = decodedToken.user?.role;
    next();
}


export const AuthRoleMiddleware = (allowedRoles: Role[])=>{
    return (req:any, res:Response, next:NextFunction)=>{
        if(!allowedRoles.includes(req.role)){
            return next(new CustomError(StatusCodes.UNAUTHORIZED, "You are not authorized to access this resource"));
        }
        next();
    }
}