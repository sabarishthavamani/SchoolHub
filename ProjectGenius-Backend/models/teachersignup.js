const mongoose = require('mongoose');
const { Schema } = mongoose;


const teachersignupSchema  = new Schema ({

    'email' : String,
    'password' : String,

})

let teachersignupModel = mongoose.model('teachersignup', teachersignupSchema , 'teachersignup' )


module.exports = teachersignupModel;