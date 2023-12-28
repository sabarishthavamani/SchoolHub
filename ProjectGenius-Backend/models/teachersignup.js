const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId

const teachersignupSchema  = new Schema ({

    'teacherId' : String,
    'password' : String,

})

let teachersignupModel = mongoose.model('teachersignup', teachersignupSchema , 'teachersignup' )


module.exports = teachersignupModel;