import jwt from "jsonwebtoken";
import { UserResponse } from "../dtos/auth.dto";


export const generateToken = (user:UserResponse) => {
    return new Promise((resolve, reject) => {
        jwt.sign({user}, process.env.JWT_SECRET!, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

export const verifyToken = (token:string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if (err) {
                reject(err);
            }
            resolve(user);
        });
    });
}