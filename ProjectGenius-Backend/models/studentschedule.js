const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    'teacherName': String,
    'teacherId': String,
    'schedule': [{
      'day': String,
    'periods': {
      'period1':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
        'period2':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
        'period3':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
        'period4':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
        'period5':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
        'period6':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
        'period7':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
        'period8':{
          'class': String,
          'section': String,
          'subject': String,
        } ,
    }}],
  });

const studentScheduleModel = mongoose.model('studentschedule', scheduleSchema, 'studentschedule');

module.exports = studentScheduleModel;
