const mongoose = require('mongoose')
const {Schema} = mongoose

const attendanceSchema = new Schema ({
    'admissiongrade':String,
    'section':String,
    'date':String,
    'attendance': [
        {
            'studentName': String,
            'studentId': String,
            'status': String 
        }
    ]
})

const attendanceModel = mongoose.model('attandance',attendanceSchema,'attendance')

module.exports = attendanceModel;