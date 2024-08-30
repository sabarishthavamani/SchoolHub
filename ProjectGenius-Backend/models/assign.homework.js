const mongoose = require('mongoose')

const Schema = mongoose.Schema

const assignHomeWork = new Schema({
    'teacherId':String,
    'name':String,
    'assignDate':String,
    'dueDate':String,
    'className':String,
    'section':String,
    'fileUploads':String,
    'homeWork':[{
        'subject':String,
        'description':String
    }]
})

let assignHomeworkModel = mongoose.model('homeworkallocation',assignHomeWork)
module.exports = assignHomeworkModel