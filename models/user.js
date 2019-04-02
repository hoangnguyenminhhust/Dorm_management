const mongoose = require("mongoose")
const model = mongoose.model;
const schema = mongoose.Schema

const user= new schema({
    username: {type:String,required:true,default:"username"},
    password: {type:String,required:true,default:"password"},
    identifycard: {type:Number},
    phone_number: {type:Number},
    email: {type:String},
    birth:{type:String},
    user_status: {type:String,default:"approving"}
})

module.exports = model("user",user)