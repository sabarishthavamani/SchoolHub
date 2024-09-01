const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const punchingSchema = new Schema({
    teacherId: String,
    name: String,
    month: [{
        date: {
           
        timing: {
            inTime: String,
            outTime: String
        }}
    }]
});

let teacherPunchingModel = mongoose.model('punchingdetails', punchingSchema);

module.exports = teacherPunchingModel;
