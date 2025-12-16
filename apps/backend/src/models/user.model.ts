import {Schema, model} from "mongoose"
import { Role } from "../../../../packages/types";

export const UserSchema = new Schema({
    fullname: String, 
    email:{
        type: String, 
        unique:true,
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
    },
    isVerified:{
        type:Boolean,
        default:false
    }
    
}, {timestamps:true})

export const UserModel = model("User", UserSchema)

