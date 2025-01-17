// All Imports Goes Here //
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './src/routes/userRouter.js'
import connectDB from './lib/connectDB.js';
import cookieParser from 'cookie-parser';
import messageRouter from './src/routes/messageRoute.js'


const app = express();


// Configuration //
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


//Routes // 
app.use('/api',userRouter);
app.use('/api/messages',messageRouter)

connectDB();
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Listening on port " + port);
})
