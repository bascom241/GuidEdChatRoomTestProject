import express from 'express';
import {signUp,login,logout,checkAuth,updateProfile} from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../utils/multerCloudinary.js';
const router = express.Router();

router.post('/register', signUp);
router.post('/login',login)
router.post('/logout', logout);
router.get('/check-auth',verifyToken,checkAuth);
router.put('/update-profile',upload.single('profile'),verifyToken,updateProfile);




export default router;