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




//routes
router.route('/register').post( adminCtrl.createadmin);
router.route('/login').post(adminValid.loginValid, adminCtrl.adminLogin);
router.route('/verification').post(adminValid.verifyValid, adminCtrl.verifyCode);
router.route('/re-verification').get( adminCtrl.ReverifyCode);
router.route('/admission').post(profileUpload.fields([{ name: 'signature', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),adminValid.registerValid, adminCtrl.registerStudent);
router.route('/viewstudent').get(adminCtrl.viewStudent);
module.exports = router;