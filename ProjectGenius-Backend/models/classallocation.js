const mongoose = require('mongoose');
const { Schema } = mongoose;

const classAllocationSchema = new Schema ({

    'name':String,
    'teacherId':String,
    'status': [{
        'className' : String,
        'section' : String,
        'subjects':String,
        'role':String
       }]
})

let classAllocationModel = mongoose.model('classallocate', classAllocationSchema, 'classallocate' )

module.exports = classAllocationModel;