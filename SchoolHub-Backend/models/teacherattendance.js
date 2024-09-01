const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherAttendanceSchema = new Schema({
    'date': String,
    'month':String,
    'day':String,
    'attendance': [{
        'name': String,
        'teacherId': String,
        'status': String,
    }],
})

let teacherAttendanceModel = mongoose.model('teacherAttendance', teacherAttendanceSchema, 'teacherAttendance')

module.exports = teacherAttendanceModel;