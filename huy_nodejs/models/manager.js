const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    password: String,
    identifyCard: Number,
    phone: Number,
    email: String,
    birth: Date,
})

const managerModel = mongoose.model('Manager',managerSchema);
module.exports = managerModel;