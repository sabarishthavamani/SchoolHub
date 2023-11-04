const mongoose = require('mongoose');
const { Schema } = mongoose;


const studentSchema = new Schema ({
    'grade' :String,
    'term1' :Number,
    'term2':Number,
    'term3':Number,
    'updateddate':String,
})

let studentModel = mongoose.model('fees', studentSchema, 'fees' )


module.exports = studentModel;