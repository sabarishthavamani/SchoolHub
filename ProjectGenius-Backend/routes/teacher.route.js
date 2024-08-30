const express = require('express')
const isEmpty = require('is-empty')
const router = express.Router()
const multer = require('multer')
const config = require('../config')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,config.IMAGE.HomeWork_FILE_PATH)
    },
    filename:function(req,file,cb){
        let mimeType = file.mimetype
        let split = mimeType.split('/')
        let fileType = split[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
})

const HomeWorkUpload = multer({storage:storage})

const storage1 = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,config.IMAGE.Meeting_FILE_PATH)
    },
    filename:function(req,file,cb){
        let mimeType = file.mimetype
        let split = mimeType.split('/')
        let fileType = split[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
})

const ParentsMeetingUploads = multer({storage:storage1})

//config
const passportAuth = require('../config/passport')
//validation
const teacherValid = require('../validation/teacher.validation')
//controller
const teacherCtrl = require('../controller/teacher.controller')
//routes
const teachermonthatt = require ('../controller/teachermonthlyatt.controlller')






//teacher-loginviewstudent
router.route('/teacher-register').post(teacherValid.teacherregisterValid,teacherCtrl.createteacher);
router.route('/teacher-login').post(teacherValid.teacherloginValid,teacherCtrl.teacherLogin);
router.route('/forgetpassword').post(teacherValid.forgetpasswordValid,teacherCtrl.forgetpassword);
router.route('/resetpassword').post(teacherValid.resetpasswordValid,teacherCtrl.resetpassword);
router.route('/changepassword').post(passportAuth, teacherValid.changepasswordValid, teacherCtrl.changePassword);
router.route('/findsection').post(teacherValid.findsectionValid,teacherCtrl.findSection);
router.route('/daily-attendance').post(teacherCtrl.dailyattendance);
router.route('/displayAttendance').get(teacherCtrl.displayAttendance);
router.route('/marksheet').post(teacherCtrl.createmarksheet);
router.route('/marksheet-update').post(teacherCtrl.updatemarksheet);
router.route('/find-marksheet').post(teacherValid.findmarksectionValid,teacherCtrl.findmarksheet);
router.route('/find-singlemarksheet').get(teacherCtrl.findMarksheetForSingleStudent);
router.route('/marksheetforanalysis').get(teacherCtrl.findmarksheetforanalysis);
router.route('/findsectionformarks').post(teacherValid.findmarksectionValid,teacherCtrl.findSectionforMarks);
router.route('/update-attendance/:id/:studentId').put(teacherCtrl.dailyAttendanceUpdate);
router.route('/posthomework').post(HomeWorkUpload.fields([{name:'fileUploads',maxCount:1}]  ) ,teacherCtrl.postHomeWork)
router.route('/gethomeworklist').get(teacherCtrl.getHomeWorkList)
router.route('/getsingle-homework/:id').get(teacherCtrl.getSingleHomeWork);
router.route('/updatehomeworklist/:id').put(teacherCtrl.updateHomeWork)
router.route('/deletehomeworklist/:id').delete(teacherCtrl.deleteHomeWork)
router.route('/postparentsmeeting').post(ParentsMeetingUploads.fields([{name:'fileUploads',maxCount:1}]  ) ,teacherCtrl.assignMeeting)
router.route('/getmeetinglist').get(teacherCtrl.getMeetingList)
router.route('/deletemeetinglist/:id').delete(teacherCtrl.deleteMeeting)


router.route('/daily-bus-attendance').post(teacherCtrl.dailyBusAttendance);
router.route('/display-bus-attendance').get(teacherCtrl.displayBusAttendance);
router.route('/find-bus-attendance').post(teacherCtrl.findAttendance);
router.route('/update-bus-attendance/:id/:passengerId').put(teacherCtrl.BusAttendanceUpdate);


router.route('/creatmonthatt').post(teachermonthatt.createMonthAttendance);
router.route('/employeeDisplay/:month/:date').put(teachermonthatt.employeeDisplay);
router.route('/selectedmonthDisplay/:month').get(teachermonthatt.selectedmonthDisplay);
router.route('/displayoverall').get(teachermonthatt.displayoverall);
router.route('/EmployeeAttendanceUpdate/:month/:date/:employeeId').put(teachermonthatt.EmployeeAttendanceUpdate);


module.exports = router;