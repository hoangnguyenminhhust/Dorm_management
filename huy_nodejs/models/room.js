const mongoose = require('mongoose');

const roomSchema = new mongoose.Schhema({
    username: String,
    student_id: Number,
    building: String,
    room_status: String,
    room_price: Number,
    room_id: String

})

const roomModel = mongoose.model('Room',roomSchema);
module.exports = roomModel;