import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {getUsersForSideBar ,getMessages,sendMessage } from '../controllers/messageController.js'
import upload from '../utils/multerCloudinary.js';
const router = express.Router();
router.get('/users',verifyToken,getUsersForSideBar);
router.get('/:id',verifyToken, getMessages);
router.post('/send/:id',upload.single("image"), verifyToken,sendMessage)

export default router