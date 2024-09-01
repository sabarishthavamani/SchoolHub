const mongoose = require('mongoose');
const { Schema } = mongoose;

const driversignupSchema  = new Schema ({
    
    'driverId':String,    
    'password' : String

})

let driversignupModel = mongoose.model('driversignup', driversignupSchema , 'driversignup' )

module.exports = driversignupModel;