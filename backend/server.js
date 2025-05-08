const express = require('express');
const connect_DB = require('./config/db_config');
const MiddleWere = require('./MiddleWere/ErrorHandler');
require("dotenv").config()
const path = require("path")
const cors = require("cors")


const app = express()

// DB connection
connect_DB()

const PORT = process.env.PORT || 8000

// body parser
app.use(express.json())
app.use(express.urlencoded({extended : true}))


// Cors Error Handle
app.use(cors({
    origin: '*', // 🌐 Public access for any frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false // ❌ Cookies nahi use ho rahe, toh false
  }));
  
  app.options('*', cors()); // Preflight ko bhi allow karo
  app.use(express.json());


// User ROutes
app.use("/api/user" , require("./routes/auth/AuthRoutes"))

// Transactoin Routes
app.use("/api/trans" , require("./routes/AddTransaction/AddTransactionRoutes"))

// Admin Routes
app.use("/api/admin", require("./routes/Admin/AdminRoutes"))


// Diployment Code in render
// if(process.env.NODE_ENV === "production"){
//     const __dirname = path.resolve();
//     app.use("/uploads", express.static("/var/data/uploads"));
//     app.use(express.static(path.join(__dirname, "client", "dist")));

//     app.get("*", (req, res) =>
//         res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
//     );
// }
    
    
app.get("/" , (req,res) =>{
    res.json({
        message : "Welcome to Expance Manager API 1.0"
    })
    })




// Error Handler
app.use(MiddleWere)

app.listen(PORT , () =>{
    console.log("server is Running at :" , PORT);
})