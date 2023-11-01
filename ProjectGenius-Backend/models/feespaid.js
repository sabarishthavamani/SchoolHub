const mongoose = require('mongoose');
const { Schema } = mongoose;


const feespaidSchema = new Schema ({
    'name' :String,
    'studentId' :String,
    'dueamount':Number,
    'total':Number,
    'amountpaid':Number,
    'balanceamount':Number
})

let feespaidModel = mongoose.model('feespaid', feespaidSchema, 'feespaid' )

module.exports = feespaidModel;