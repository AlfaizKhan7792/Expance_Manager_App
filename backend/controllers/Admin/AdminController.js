const expressAsyncHandler = require("express-async-handler");
const Auth = require("../../Models/Auth/AuthSchema")
const Trans = require("../../Models/AddTransaction/AddTransactionSchema")

// Fetch All Users
const GetAllUsers = expressAsyncHandler(async (req,res) =>{
const allUsers = await Auth.find()
if(!allUsers){
    res.status(400)
    throw new Error("Users Not Found!!");    
}else{
    res.status(200).json(allUsers)
}
})


// Fetch All Transactions
const GetAllTrans = expressAsyncHandler(async (req,res) =>{
    const allTrans = await Trans.find()
    if(!allTrans){
        res.status(400)
        throw new Error("Transaction's NOt Found!!");        
    }else{
        res.status(200).json(allTrans)
    }
})


module.exports = {GetAllTrans , GetAllUsers}