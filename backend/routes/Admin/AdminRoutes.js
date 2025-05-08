const express = require("express")
const { GetAllUsers, GetAllTrans, GetUserTrans } = require("../../controllers/Admin/AdminController")
const AdminProtect = require("../../MiddleWere/AdminMiddleWere")

const router = express.Router()

router.get("/all-users", AdminProtect, GetAllUsers)

router.get("/all-trans", AdminProtect, GetAllTrans)

router.get("/single-user/:id", AdminProtect, GetUserTrans)


module.exports = router