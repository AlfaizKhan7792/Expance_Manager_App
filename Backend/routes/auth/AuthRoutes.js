const express = require('express');
const { LoginUser, RegisterUser, PrivateController } = require('../../controllers/auth/AuthControllers');
const AuthProtect = require('../../MiddleWere/AuthMiddleWere');


const Router = express.Router()

Router.post("/login" ,  LoginUser)

Router.post("/register" , RegisterUser)

Router.post("/private" , AuthProtect , PrivateController)


module.exports = Router