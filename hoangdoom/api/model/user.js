const mongoose = require("mongoose")
const model = mongoose.model;
const schema = mongoose.Schema

const user= new schema({
    username: {type:String,required:true},
    password: {type:String,required:true},
    identifycard: {type:Number},
    phone_number: {type:Number},
    email: {type:String},
    birth:{type:String},
    user_status: {type:String,default:"notApproving"}
})

module.exports = model("user",user)