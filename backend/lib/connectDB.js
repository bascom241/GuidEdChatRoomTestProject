import mongoose from "mongoose";
import { config } from "dotenv";
config();
const connectDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        if(!db){
            console.log("Couldn't connect to DB ")
        }
        console.log('Connected to the database');
        return db;
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;