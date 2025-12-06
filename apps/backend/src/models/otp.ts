import {Schema, model} from "mongoose"


export const OtpSchema = new Schema({
   user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
   },
    otp:{
        type:Number,
        required:true
    },
    expiresAt:{
        type:Number,
        required:true
    }
})


export const OtpModel = model("Otp", OtpSchema);