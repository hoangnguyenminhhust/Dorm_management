const mongoose = require('mongoose');

const requestSchema = new mongoose.Schhema({
    status_request: String,
    approver: String,
    date_approve: Date
})

const requestModel = mongoose.model('Student',requestSchema);
module.exports = requestModel;