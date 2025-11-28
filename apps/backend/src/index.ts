import express, {Express} from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const APP:Express = express();
APP.use(express.json());
APP.use(express.urlencoded({extended:true}));


const PORT = process.env.PORT;


const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to database successfully.")
    }catch(error){
        console.log(`Error connecting to database`)
    }
}
 
connectDb();

APP.use("/api/auth", authRoutes);

APP.use(errorMiddleware);

APP.listen(PORT, ()=>console.log(`Server running on PORT:${PORT}`))

