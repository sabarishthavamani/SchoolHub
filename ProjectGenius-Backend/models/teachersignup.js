const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId

const teachersignupSchema  = new Schema ({

    'email' : String,
    'password' : String,
    'teacherId':{
        type:ObjectId,
        ref:'teacheradmission'
    }

})

let teachersignupModel = mongoose.model('teachersignup', teachersignupSchema , 'teachersignup' )


module.exports = teachersignupModel;