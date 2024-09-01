const mongoose = require('mongoose');
const { Schema } = mongoose;

const parentsignupSchema  = new Schema ({
    
    'fatherphonenumber':String,
    'dob':String,
    'password' : String

})

let parentsignupModel = mongoose.model('parentsignup', parentsignupSchema , 'parentsignup' )

module.exports = parentsignupModel;