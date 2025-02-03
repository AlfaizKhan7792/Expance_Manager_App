const mongoose = require("mongoose");

const connect_DB = async () =>{
   try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("DB connection is Success at :" , conn.connection.host);
   } catch (error) {
    console.log("DB connection is Faild at :" , error);
   }
}


module.exports = connect_DB