import express, {Express} from "express";

import dotenv from "dotenv";

dotenv.config();

const APP:Express = express();
APP.use(express.json());
APP.use(express.urlencoded({extended:true}));


const PORT = process.env.PORT;

APP.listen(PORT, ()=>console.log(`Server running on PORT:${PORT}`))
