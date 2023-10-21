const mongoose = require('mongoose');
const { Schema } = mongoose;


const feecollectionSchema = new Schema ({
    'name' :String,
    'studentId':String,
    'dueamount' :Number,
    'feeconcession':Number,
    'amountpayable':Number,
    'paymentterm':{
        type: String,
        enum: ['term1', 'term2', 'term3'],
        default: null
    },
})

let feecollectionModel = mongoose.model('feescollection', feecollectionSchema, 'feescollection' )


module.exports = feecollectionModel;