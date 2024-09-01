const mongoose = require('mongoose')

const Schema = mongoose.Schema

const parentsMeeting = new Schema({
    'teacherId':String,
    'name':String,
    'assignDate':String,
    'className':String,
    'section':String,
    'fileUploads':String,
    'studentName':String,
    'title':String,
    'description':String

})

let parentsMeetingModel = mongoose.model('parentsmeetingallocation',parentsMeeting)
module.exports = parentsMeetingModel