import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
   

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized User' });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded.id;

        next()
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }


}
export default verifyToken;