const {mongoose} = require("mongoose");

const AddTransactionSchema = new mongoose.Schema({
    user : {
type : mongoose.Schema.Types.ObjectId,
required : true,
ref : 'Auth',
    },
name : {
    type : String,
    required : true
},
amount : {
    type : String,
    required : true,
    unique : false
},
isCompleted : {
    type : Boolean,
    required : true,
    default : false,
},
category1 : {
    type : String,
    required : false
},
type : {
    type : String,
    required : true,
    enum : ['Credit' , 'Debit'],
    },
},{
    timestamps : true
})


module.exports = mongoose.model('Trans' , AddTransactionSchema)