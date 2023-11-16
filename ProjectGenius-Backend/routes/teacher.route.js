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

module.exports = router;