const mongoose = require('mongoose');
const { Schema } = mongoose;

// const periodSchema = new Schema({
//   'class': String,
//   'section': String,
//   'subject': String,
// });

// const daySchema = new Schema({
//   'day': String,
//   'periods': {
//     period1: periodSchema,
//     period2: periodSchema,
//     period3: periodSchema,
//     period4: periodSchema,
//     period5: periodSchema,
//     period6: periodSchema,
//     period7: periodSchema,
//     period8: periodSchema,
//   },
// });

// const scheduleSchema = new Schema({
//   'teachername': String,
//   'teacherId': String,
//   'schedule': [daySchema],
// });

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

const scheduleModel = mongoose.model('teacherschedule', scheduleSchema, 'teacherschedule');

module.exports = scheduleModel;
