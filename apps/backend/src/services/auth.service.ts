import { Role, StatusCodes } from "../../../../packages/types";
import { LoginDto, RegisterDto, UserResponse } from "../dtos";
import { UserModel, OtpModel } from "../models";
import {  sendOtpEmail,hashPassword, verifyPassword, CustomError, generateToken } from "../utils";


export const registerUser = async (request: RegisterDto)=>{
    const {fullname, email, password, role} = request;
    
    const userExist = await UserModel.findOne({email});
    
    if(userExist){
        throw new CustomError(StatusCodes.CONFLICT, `User with email ${email} already exists`);
    }
    
    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({fullname, email, password:hashedPassword, role});
    const userReponse:UserResponse = {
        id:user._id as unknown,
        fullname:user.fullname as string,
        email:user.email as string,
        role:user.role as Role
    }

    return await generateToken(userReponse);
    
}

export const loginUser = async (request: LoginDto)=>{
    const {email, password} = request;
    const user = await UserModel.findOne({email});
    if(!user){
        throw new CustomError(StatusCodes.NOT_FOUND, `User with email ${email} not found`);
    }
    const isMatch = await verifyPassword(password, user.password as string);
    if(!isMatch){
        throw new CustomError(StatusCodes.UNAUTHORIZED, "Invalid password");
    }
    const userReponse:UserResponse = {
        id:user._id as unknown,
        fullname:user.fullname as string,
        email:user.email as string,
        role:user.role as Role
    }
    return await generateToken(userReponse);
    
}


export const sendPasswordResetOtp = async (email:string)=>{

   
    const user = await UserModel.findOne({email});
    if(!user){
        throw new CustomError(StatusCodes.NOT_FOUND, `User with email ${email} not found`);
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 5 * 60 * 1000;
    
     await OtpModel.create({user:user._id, otp, expiresAt});
     await sendOtpEmail(user.email as string, otp);
     return true;
}


export const validateOtp = async (email:string, otp:string)=>{
    const user = await UserModel.findOne({email});
    if(!user){
        throw new CustomError(StatusCodes.NOT_FOUND, `User with email ${email} not found`);
    }
    const otpModel = await OtpModel.findOne({user:user._id});
    if(!otpModel){
        throw new CustomError(StatusCodes.NOT_FOUND, `Otp not found`);
    }
    if(Date.now() > otpModel.expiresAt){
        throw new CustomError(StatusCodes.UNAUTHORIZED, "Otp expired");
    }

    if(otpModel.otp !== parseInt(otp)){
        throw new CustomError(StatusCodes.UNAUTHORIZED, "Invalid otp");
    }

    await OtpModel.deleteOne({user:user._id});
    return true;
}


export const updateUserPassword = async (email:string, password:string)=>{
    const user = await UserModel.findOne({email});
    if(!user){
        throw new CustomError(StatusCodes.NOT_FOUND, `User with email ${email} not found`);
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await user.save();
    return true;
}