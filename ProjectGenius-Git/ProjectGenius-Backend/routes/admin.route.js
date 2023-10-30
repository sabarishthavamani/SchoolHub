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

const profileUpload = multer({ storage: storage })

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


//routes
//admin
router.route('/register').post( adminCtrl.createadmin);
router.route('/login').post(adminValid.loginValid, adminCtrl.adminLogin);
router.route('/verification').post(adminValid.verifyValid, adminCtrl.verifyCode);
router.route('/re-verification').get( adminCtrl.ReverifyCode);
//admission
router.route('/admission').post(profileUpload.fields([{ name: 'signature', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),adminValid.registerValid, adminCtrl.registerStudent);
router.route('/admission-valid').post(adminValid.registerValid);
//student
router.route('/viewstudent').get(adminCtrl.viewStudent);
router.route('/deletestudent/:id').get(adminCtrl.deleteStudent);
router.route('/getsingle-student/:id').get(adminCtrl.getSingleStudent);
router.route('/updatestudent').post(profileUpload.fields([{ name: 'signature', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),adminValid.updateValid,adminCtrl.updateStudent);
//feepayment
router.route('/feessetup').post(adminCtrl.createFeeSetup);
router.route('/feescollection').post(adminValid.feecollectionValid,adminCtrl.createFeeCollection);
router.route('/viewfees').get(adminCtrl.findFeeSetup);
router.route('/feepayment/:name').post(adminCtrl.feePayment);
router.route('/feespaid').post(adminCtrl.feesPaid);
//teacher
router.route('/teacheradmission').post(teacherprofileUpload.fields([{ name: 'teachersignature', maxCount: 1 }, { name: 'teacherphoto', maxCount: 1 }]),adminValid.teacherregisterValid, adminCtrl.registerTeacher);
router.route('/viewteacher').get(adminCtrl.ViewTeacher);


module.exports = router;