import { Role, StatusCodes } from "../../../../packages/types";
import { LoginDto, RegisterDto, UserResponse } from "../dtos/auth.dto";
import { UserModel } from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/bcryptHash";
import { CustomError } from "../utils/customError";
import { generateToken } from "../utils/jwtHandler";


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

    const token = await generateToken(userReponse);
    return token;
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
    const token = await generateToken(userReponse);
    return token;
}

