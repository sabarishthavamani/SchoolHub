const mongoose = require('mongoose');
const { Schema } = mongoose;

const teachersignupSchema  = new Schema ({

    'teacherId' : String,
    'password' : String,
    'email':String

})

let teachersignupModel = mongoose.model('teachersignup', teachersignupSchema , 'teachersignup' )


module.exports = teachersignupModel;