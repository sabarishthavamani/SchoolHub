const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupsectionSchema = new Schema ({

    'admissiongrade':String,
    'section':String,
    'students': [{
        'name' : String,
        'studentId' : String,
       }]
})

let groupsectionModel = mongoose.model('groupsection', groupsectionSchema, 'groupsection' )

module.exports = groupsectionModel;