const mongoose = require('mongoose');
const { Schema } = mongoose;


const scheduleSchema = new Schema ({

    'teachername' : String,
    'teacherId' : String,
    'classname':String,
    'section':String,
    'day':String,
    'subject':String,
    'timeslot':String
})

let scheduleModel = mongoose.model('teacherschedule', scheduleSchema, 'teacherschedule' )

module.exports = scheduleModel;