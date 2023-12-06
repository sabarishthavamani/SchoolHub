const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherAttendanceSchema = new Schema ({

    'name':String,
    'teacherId':String,
    'attendance': [{
        'start' : String,
        'end' : String,
        'date':String,
        'title':String,
       }],
})

let teacherAttendanceModel = mongoose.model('teacherAttendance', teacherAttendanceSchema, 'teacherAttendance' )

module.exports = teacherAttendanceModel;