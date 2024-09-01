const mongoose = require('mongoose')
const {Schema} = mongoose

const attendanceSchema = new Schema ({
    'date':String,
    'attendance': [
        {
            'passengerName': String,
            'passengerId': String,
            'status': String 
        }
    ]
})

const busAttendanceModel = mongoose.model('dailybusattendance',attendanceSchema,'dailybusattendance')

module.exports = busAttendanceModel;