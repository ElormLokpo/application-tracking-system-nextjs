import {Schema, model} from "mongoose"
import {hashPassword} from "../utils/bcryptHash";
import { Role } from "../../../../packages/types";

export const UserSchema = new Schema({
    fullname: String, 
    email:{
        type: String, 
        validate: {
      validator: (v:string) => /\S+@\S+\.\S+/.test(v),
      message: (props:any) => `${props.value} is not a valid email!`,
    },
    },
    password:{
        type:String, 
    },
    role:{
        type:String,
        enum:Object.values(Role),
        default: Role.ADMIN
    }
}, {timestamps:true})

export const UserModel = model("User", UserSchema)

