const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollSchema = new Schema({
    year: Number,
    months: [{
        month: {
            type: String,
            required: true
        },
        EmployeMonthlyAttendance: [{
            name: String,
            employeeId: String,
            days : [{
                date : String,
                status : String,
                leaveType: String,
                approval : String,
            }]
        }]
    }]
});

module.exports = mongoose.model('teachermonthlyattendances', payrollSchema);
