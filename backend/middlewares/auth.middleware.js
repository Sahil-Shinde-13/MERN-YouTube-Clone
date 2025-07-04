import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized: Token missing"});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decode.id};
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token"});
    }
}