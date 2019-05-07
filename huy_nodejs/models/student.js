const mongoose = require('mongoose');

const studentSchema = new mongoose.Schhema({
    username: String,
    fulname: String,
    password: String,
    identifyCard: Number,
    phone: Number,
    email: String,
    student_id: Number,
    birth: Date,
    timeStartLearn: Date,
    Course: Number,
    Branch: Number,
    Student_status: String

})

const studentModel = mongoose.model('Student',studentSchema);
module.exports = studentModel;