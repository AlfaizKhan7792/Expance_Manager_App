const expressAsyncHandler = require("express-async-handler");
const Auth = require("../Models/Auth/AuthSchema")
const jwt = require("jsonwebtoken")

const AuthProtect = expressAsyncHandler(async (req,res,next) =>{
let token;
try {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        // console.log(decoded);
req.user = await Auth.findById(decoded.id).select("-password")
next()
    }else{
        res.status(400)
        throw new Error("User not Authorized!!");
    }
} catch (error) {
    res.status(404)
    throw new Error("INvalid Credentials!!" , error);
    
}
})


module.exports = AuthProtect