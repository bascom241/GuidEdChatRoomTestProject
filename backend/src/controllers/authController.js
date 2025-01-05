import bcrypt from 'bcryptjs';
import User from "../models/userModel.js";
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';
import cloudinary from '../utils/cloudinaryConfig.js';


function savedUser(user) {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
}
const signUp = async (req, res) => {
    const requiredFields = ["userName", "email", "password"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    try {
        if (missingFields.length) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` })
        }

        // Check if user already exists
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword
        })
        await newUser.save();

        const result = savedUser(newUser);
        generateTokenAndSetCookie(res, newUser._id);


        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ message: error })
    }

}


const login = async (req, res) => {
    const requiredField = ["email", "password"];
    const missingField = requiredField.filter(field => !req.body[field]);


    try {
        if (missingField.length) return res.status(400).json({ message: `Missing required field ${missingField.join(", ")}` })

        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return res.status(404).json({ message: 'Invalid Credentials' });
        user.lastLogin = new Date();
        user.save();
        generateTokenAndSetCookie(res, user._id);
        const result = savedUser(user);
        res.status(200).json({ success: true, data: result });

    } catch (error) {
        res.status(500).json({ status: error.status });
    }
}
// Scalable and Optimized 

const logout = (req,res) =>{
    res.clearCookie("token");
    res.status(200).json({status:"success", message:"Logged Out successfully"});
}

const checkAuth = async (req,res) => {

 const userId = req.user;
 try{
    const user = await  User.findById(userId).select("-password");  
    console.log(user);
    if(!user){
        return res.status(404).json({success:false, message:"User not found"})
    }
    res.status(200).json({success:true,data:user})
 }catch(err){
    res.status(500).json({status:'error', message:err})
 }

}


const updateProfile = async(req,res) =>{
    try{
      
        const profile = req.file
        console.log(profile)
        const userId = req.user;
        if(!profile){
            return res.status(404).json({message:'Profile not Found'});
        }
        if (!profile.path) {
            return res.status(400).json({ message: 'Upload failed, no secure URL available' });
        }

        // const uploadResponse = await cloudinary.uploader.upload(profile);
        const updatedUser = await User.findByIdAndUpdate(userId,{profile:profile.path},{new:true});
        

        res.status(200).json({success:true, updatedUser})


    }catch(err){
        res.status(500).json({message:'Error: ' + err.message});
        console.log(err);
    }
}
export { login, signUp,logout,checkAuth,updateProfile };