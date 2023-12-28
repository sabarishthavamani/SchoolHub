const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema ({

    'name' : String,
    'studentId' : String,
    'admissiongrade':String,
    'section':String
})

let sectionModel = mongoose.model('section', sectionSchema, 'section' )

module.exports = sectionModel;