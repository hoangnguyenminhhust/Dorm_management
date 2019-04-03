const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schhema({
    room_id: Number,
    fee_room: Number,
    payment_room_status: String,
    fee_living: Number,
    payment_living_status: String
})

const receiptModel = mongoose.model('Receipt',receiptSchema);
module.exports = receiptModel;