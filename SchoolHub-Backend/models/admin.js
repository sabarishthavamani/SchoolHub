const mongoose = require('mongoose');
const { Schema } = mongoose;


const adminSchema = new Schema ({

    'email' : String,
    'password' : String,
    'phone' : String,
    'verificationCode':String
})

let adminModel = mongoose.model('admin', adminSchema, 'admin' )


module.exports = adminModel;