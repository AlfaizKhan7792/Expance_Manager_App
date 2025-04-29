const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const Auth = require("../Models/Auth/AuthSchema")

const AdminProtect = expressAsyncHandler(async (req,res, next) =>{
let token;
try {
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    // Store in token variable by slicing word Bearer
    token = req.headers.authorization.split(" ")[1]
    // Decode the Token
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = await Auth.findById(decoded.id).select("-password")
    if(req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("User Not Authorized || Only Admin");        
    }
}else{
    res.status(401)
    throw new Error("Use Not Authorized :", error);    
}
} catch (error) {
    res.status(401)
    throw new Error("User Not Authorized : ", error);    
}
})

module.exports = AdminProtect