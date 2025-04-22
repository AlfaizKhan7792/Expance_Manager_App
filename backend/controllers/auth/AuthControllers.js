const expressAsyncHandler = require("express-async-handler");
// const Auth = require("../../Models/Auth/AuthSchema")
const Auth = require("../../Models/Auth/AuthSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const LoginUser = expressAsyncHandler(async (req,res) =>{

    const {email , password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Fill All Details!!");
    }

    // Create Login User
const user = await Auth.findOne({email : email})
if(user && bcrypt.compare(password , user.password)){
    res.status(200).json({
        id : user._id,
     name : user.name,
        email : user.email,
        phone : user.phone,
        admin : user.isAdmin,
     token : GenerateToken(user._id)
    })
}else{
    res.status(401)
    throw new Error("User Not LogedIn!!");
    
}


})


const RegisterUser = expressAsyncHandler(async (req,res) =>{
    const {name , email , phone , password } = req.body
    if(!name || !email || !phone || !password){
        res.status(400)
        throw new Error("Fill all details");        
    }

    // check number
    if(phone.length !== 10){
        res.status(400)
        throw new Error("Enter a valid Number");  
    }

    // check email and phone is exist
    const EmailExist = await Auth.findOne({email : email})
    const PhoneExist = await Auth.findOne({phone : phone})
    if(EmailExist || PhoneExist){
res.status(400)
throw new Error("User Already Exists");
    }

    // Hashed password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password , salt)

    // Register User
    const user = await Auth.create({name , email , phone , password : hashedPassword})
    if(!user){
        res.status(401)
        throw new Error("User Not REgistered!!");        
    }else{
        res.status(200).json({
            id : user._id,
            name : user.name,
            email : user.email,
            phone : user.phone,
            admin : user.isAdmin,
            token : GenerateToken(user._id)
        })
    }

})

const PrivateController = expressAsyncHandler(async (req,res) =>{
    res.json(req.user)
})


// Generate Token
const GenerateToken =  (id) =>{
return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : "30d"})
}

module.exports = {LoginUser , RegisterUser , PrivateController}