import User from "../models/userModel.js";
import Message from '../models/messageModel.js'

const getUsersForSideBar = async (req, res) => {

    try {

        const loggedInUserId = req.user;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("+password");

        res.status(200).json(filteredUsers);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user;

        const messages = await Message.find({
            $or: [
                {
                    senderId: senderId, receiverId: userToChatId,
                    senderId: userToChatId, receiverId: senderId
                }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
    }
}

const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const image = req.file
        const { id: receiverId } = req.params;
        const senderId = req.user;

        console.log('Uploaded Image:', image); // Check if the image exists

        let imageUrl;
        if (image) {
            imageUrl = image.path; // Assign image URL if the image is present
        } else {
            imageUrl = null; // If no image, set it to null or leave it empty
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export { getUsersForSideBar, getMessages,sendMessage }

