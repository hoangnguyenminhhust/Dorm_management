const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    fee_room: {type: Number,default:0},
    payment_room_status: String,
    fee_living: {type: Number,default:0},
    payment_living_status: String,
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    approver: String,
    date_approve: Date,
    date_valid_fee_room:{type:Date,default: 30/05/1111},
    date_valid_fee_living:{type:Date,default: 30/05/1111},

})

const receiptModel = mongoose.model('Receipt',receiptSchema);
module.exports = receiptModel; 