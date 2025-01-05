import jwt from 'jsonwebtoken';
const generateTokenAndSetCookie = (res,userId) =>{
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"90d"});

    res.cookie("token", token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}



export default generateTokenAndSetCookie