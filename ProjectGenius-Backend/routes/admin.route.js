const express = require('express')
const isEmpty = require('is-empty')
const router = express.Router()
const multer = require('multer')


//config
const config = require('../config/index')

// controllers
const adminCtrl = require('../controller/admin.controller')

//validation
const adminValid = require('../validation/admin.validation')

//Vehicle
const VehicleCtrl = require('../controller/vehicle.controller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.IMAGE.USER_FILE_PATH)
    },
    filename: function (req, file, cb) {
        let mimeType =  file.mimetype;
        let split = mimeType.split('/');
        let fileType = split[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
})

const studentprofileUpload = multer({ storage: storage })

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.IMAGE.TEACHER_FILE_PATH)
    },
    filename: function (req, file, cb) {
        let mimeType =  file.mimetype;
        let split = mimeType.split('/');
        let fileType = split[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
})

const teacherprofileUpload = multer({ storage: storage2 })


const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.IMAGE.DRIVER_FILE_PATH)
    },
    filename: function (req, file, cb) {
        let mimeType =  file.mimetype;
        let split = mimeType.split('/');
        let fileType = split[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
})

const driverprofileUpload = multer({ storage: storage3 })


//VehiclePhoto
const storage4 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.IMAGE.VehiclePhoto_FILE_PATH)
    },
    filename: function (req, file, cb) {
        let mimeType =  file.mimetype;
        let split = mimeType.split('/');
        let fileType = split[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
})

const VehiclePhoto = multer({ storage: storage4 })


//routes
//admin-login
router.route('/register').post( adminCtrl.createadmin);
router.route('/login').post(adminValid.loginValid, adminCtrl.adminLogin);
router.route('/verification').post(adminValid.verifyValid, adminCtrl.verifyCode);
router.route('/re-verification').get( adminCtrl.ReverifyCode);
//student-admission
router.route('/admission').post(studentprofileUpload.fields([{ name: 'signature', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),adminCtrl.registerStudent);
//student-details
router.route('/viewstudent').post(adminCtrl.viewStudent);
router.route('/deletestudent/:id').get(adminCtrl.deleteStudent);
router.route('/getsingle-student/:id').get(adminCtrl.getSingleStudent);
router.route('/updatestudent').post(studentprofileUpload.fields([{ name: 'signature', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),adminValid.updateValid,adminCtrl.updateStudent);
router.route('/getstudentaadhaar').get(adminCtrl.studentaadhaarValid);
router.route('/groupsectionallocate').post(adminCtrl.groupsectionallocate);
router.route('/groupsectionverify').post(adminCtrl.verifyGroupSection);
router.route('/singlesectionallocate').post(adminValid.sectionValid,adminCtrl.singlesectionAllocation);
router.route('/singlesectionverify').post(adminCtrl.verifysingleSection);
router.route('/updatesinglesection').post(adminCtrl.updatesingleSection);
//feesetup & feepayment
router.route('/feessetup').post(adminValid.feesetupValid,adminCtrl.createFeeSetup);
router.route('/feesupdate').post(adminValid.feesetupEditValid,adminCtrl.updateFeeSetup);
router.route('/getsingle-fees/:id').get(adminCtrl.getSingleFees);
router.route('/feescollection').post(adminValid.feecollectionValid,adminCtrl.createFeeCollection);
router.route('/viewfees').get(adminCtrl.findFeeSetup);
router.route('/feepayment/:name').post(adminCtrl.feePayment);
router.route('/feespaid').post(adminCtrl.feesPaid);
router.route('/feesstatus').post(adminCtrl.feestatus);
//teacher
router.route('/teacheradmission').post(teacherprofileUpload.fields([{ name: 'teachersignature', maxCount: 1 }, { name: 'teacherphoto', maxCount: 1 }]),adminCtrl.registerTeacher);
router.route('/viewteacher').get(adminCtrl.ViewTeacher);
router.route('/deleteteacher/:id').get(adminCtrl.deleteTeacher);
router.route('/updateteacher').post(teacherprofileUpload.fields([{ name: 'teachersignature', maxCount: 1 }, { name: 'teacherphoto', maxCount: 1 }]),adminValid.teacherupdateValid,adminCtrl.updateTeacher);
router.route('/getsingle-teacher/:id').get(adminCtrl.getSingleTeacher);
router.route('/getteacheraadhaar').get(adminCtrl.teacheraadhaarValid);
router.route('/teacherschedule').post(adminCtrl.createteacherSchedule);
router.route('/getteacherschedule/:teacherId').get(adminCtrl.findteacherSchedule);
router.route('/getfixedschedule').get(adminCtrl.findFixedSchedule);
router.route('/findschedulefordetails').post(adminCtrl.findScheduleforDetails);
router.route('/teacherallocation').post(adminCtrl.teacherclassAllocate);
router.route('/findteacherclass').get(adminCtrl.findTeacherClass);
router.route('/findteacherwholeclass').get(adminCtrl.findTeacherWholeClass);
router.route('/teacherattendance').post(adminCtrl.teacherAttendanceSetup);
router.route('/findteacherattendance').get(adminCtrl.getAttendance);
router.route('/findmonthlyattendance').get(adminCtrl.getAttendanceforMonth);


//driver
router.route('/driveradmission').post(driverprofileUpload.fields([{ name: 'driverphoto', maxCount: 1 }, { name: 'licencephoto', maxCount: 1 }]),adminCtrl.registerDriver);
router.route('/getdriveraadhaar').get(adminCtrl.driveraadhaarValid);
router.route('/viewdriver').get(adminCtrl.ViewDriver);

const VehicleRegistrationController=require('../controller/vehicle.controller')

// Vehicle Registration Details
router.route('/vehicleadmission').post(VehiclePhoto.fields([{ name: 'pollutionCertificate', maxCount: 1 }, { name: 'insurance', maxCount: 1 }]),VehicleCtrl.VehiclePost);
router.get('/VehicleDetails',VehicleRegistrationController.VehicleDetails);
router.get('/VehicleDetailById/:id',VehicleRegistrationController.VehicleDetailById);
router.put('/VehicleDetailUpdate/:id',VehicleRegistrationController.VehicleDetailUpdate);
router.delete('/VehicleDetailDelete/:id',VehicleRegistrationController.VehicleDetailDelete);



module.exports = router;