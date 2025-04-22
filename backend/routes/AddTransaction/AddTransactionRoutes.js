const express = require('express');
const { AddTrans, UpdateTrans, GetUserData, RemoveTrans } = require('../../controllers/AddTransactoin/AddTransactionControllers');
const AuthProtect = require('../../MiddleWere/AuthMiddleWere');


const Router = express.Router()

// Create Transaction
// EndPoint : "/"
// Requiest : post
// Access : Authorized User
Router.post("/" , AuthProtect , AddTrans)


// Update Transaction
// EndPoint : "/:id"
// Requiest : put
// Access : Authorized User
Router.put("/:id" , AuthProtect , UpdateTrans)


// Route to get all transactions and categories for a user
// Endpoint: "/user-data"
// Request: GET
// Access: Authorized User
Router.get("/user-data", AuthProtect, GetUserData);


// Remove Transaction
// EndPoint : '/:id'
// Request : Delete
// Access : Authorized User
Router.delete("/:id" , AuthProtect , RemoveTrans)


module.exports = Router