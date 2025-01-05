import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    image:String,
    text:String
},{timestamps:true})


const Message = mongoose.model('Message',messageSchema);
export default Message;