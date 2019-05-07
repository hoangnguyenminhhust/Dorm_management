const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    building: String,
    room_status: String,
    room_price: Number,
    room_id: String,
    room_gender: String,
    amount_std: Number,
   
})
const roomModel = mongoose.model('Room',roomSchema);
module.exports = roomModel;