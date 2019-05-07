const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    request_status: String,
    approver: String,
    date_approve: Date,
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }

})

const requestModel = mongoose.model('Request',requestSchema);
module.exports = requestModel;