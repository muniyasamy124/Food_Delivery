import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // console.log('auth',authHeader)
    if (!authHeader) {
        return res.json({ success: false, message: "Not authorized login again" })
    }
   
    
    const token  = authHeader.split(" ")[1]
    // console.log("token",token)

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.id = token_decode.id;
        next()
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
export default authMiddleware