const mongoose = require('mongoose');
const { Schema } = mongoose;


const markSchema = new Schema ({

    'admissiongrade' : String,
    'section' : String,
    'exam':String,
    'marks':[{
        'name':String,
        'studentId':String,
         'subjects':{
            'subject1':String,
            'subject2':String,
            'subject3':String,
            'subject4':String,
            'subject5':String,
         },
         'total':String,
    }]
})

let markModel = mongoose.model('marksheet', markSchema, 'marksheet' )


module.exports = markModel;