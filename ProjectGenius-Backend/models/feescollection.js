const mongoose = require('mongoose');
const { Schema } = mongoose;


const feecollectionSchema = new Schema ({
    'name' :String,
    'studentId':String,
    'dueamount' :Number,
    'paymentterm':[{
        type: String,
        enum: ['term1', 'term2', 'term3'],
        default: null
    }],
    'admissiongrade':String
})

let feecollectionModel = mongoose.model('feescollection', feecollectionSchema, 'feescollection' )

module.exports = feecollectionModel;