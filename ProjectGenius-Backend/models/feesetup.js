const mongoose = require('mongoose');
const { Schema } = mongoose;


const studentSchema = new Schema ({
    'admissiongrade' :String,
    'term1' :Number,
    'term2':Number,
    'term3':Number,
    'updateddate':String,
    'totalfees':Number,
})

let studentModel = mongoose.model('fees', studentSchema, 'fees' )


module.exports = studentModel;