import { ObjectId } from "mongoose";
import { Role } from "../../../../packages/types";

export interface UserResponse {
  id: ObjectId | string | unknown;
  fullname: string;
  email: string;
  role: Role;
}

export interface RegisterDto {
  fullname: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserResponse;
}
