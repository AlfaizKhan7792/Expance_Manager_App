const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const Auth = require("../Models/Auth/AuthSchema")

const TransactionProtect = expressAsyncHandler(async (err,req,res,next) =>{
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
token = req.headers.authorization.split(" ")[1]
const decoded = jwt.verify(token , process.env.JWT_SECRET)
req.user = await Auth.findById(decoded.id).select("-password")
if(req.user.isAdmin){
    next()
}else{
    res.status(400)
    throw new Error("User Not Authorized || Only Admin Access");
    
}
        }
    } catch (error) {
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
})


module.exports = TransactionProtect