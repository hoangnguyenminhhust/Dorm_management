const mongoose = require("mongoose")


const student= new mongoose.Schema({
    // account: {type:String,unique: true},
    account: {type:String},
    password: {type:String},
    fullname: String,
    gender: {type:String,enum:["male","female"]},
    branch: String,
    course: Number,
    identifycard: {type:Number},
    identifycard_date:{type:String},
    dienchinhsachuutientheoquydinh: String,
    dienkhac: String,
    doanthe: {type:String,enum:["đảng viên","đoàn viên","Bộ đội hoặc TNXP xuất ngũ"]},
    hoatdongxahoi: String,
    sotruong_nangkhieu: String,
    phone_number: {type:Number},
    email: {type:String},
    birth:{type:String},
    user_status: {type:String,default:"None"},
    khicanbaocho_ong_ba: String,
    dienthoaiong_ba: Number,
    email_ong_ba: String,
    approver:String,
    date_approve: Date,
    date_valid:String,
    date_valid_room: {type:Date,default: 30/05/1111},
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
})
const studentModel = mongoose.model('Student',student);
module.exports = studentModel;