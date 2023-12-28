const express = require('express')
const isEmpty = require('is-empty')
const router = express.Router()

//validation
const teacherValid = require('../validation/teacher.validation')
//controller
const teacherCtrl = require('../controller/teacher.controller')
//routes
//teacher-login
router.route('/teacher-register').post(teacherValid.teacherregisterValid,teacherCtrl.createteacher);
router.route('/teacher-login').post(teacherValid.teacherloginValid,teacherCtrl.teacherLogin);
router.route('/findsection').post(teacherValid.findsectionValid,teacherCtrl.findSection);
router.route('/daily-attendance').post(teacherCtrl.dailyattendance);
router.route('/marksheet').post(teacherCtrl.createmarksheet);
router.route('/find-marksheet').post(teacherValid.findmarksectionValid,teacherCtrl.findmarksheet);
router.route('/findsectionformarks').post(teacherValid.findmarksectionValid,teacherCtrl.findSectionforMarks);


module.exports = router;