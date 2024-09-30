import express from 'express';
import authRouter from "./routes/auth.route.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT

console.log("MONGO_URL:", process.env.MONGO_URL);
app.use(express.json());
app.use ("/api/v1/auth",authRouter);



app.listen(PORT, ()=>{
console.log("server started at http://localhost:" + PORT);
});
