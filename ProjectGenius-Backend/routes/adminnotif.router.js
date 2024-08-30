const { model } = require('mongoose');
const notecontroller = require ('../controller/adminnotification.controller')
const express = require('express')
const router = express.Router();
const multer = require('multer')

//config

const config = require('../config/index')
//adminotofocationphoto

const notificationphoto = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.IMAGE.AdminnotificationPhoto_FILE_PATH)},
    filename: function (req, file, cb) {
        let mimeType = file.mimetype;
        let split = mimeType.split('/');
        let fileType = split[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType);
    }
});

const AdminnotificationPhoto = multer({ storage: notificationphoto });



router.route('/newadminNotification').post(AdminnotificationPhoto.fields([{ name: 'photo', maxCount: 1 }]), notecontroller.newadminNotification);
router.put('/adminnotificationUpdate/:id',notecontroller.adminnotificationUpdate)
router.get('/adminnotificationDisplay',notecontroller.adminnotificationDisplay)
router.get('/adminnotificationDisplaybyId/:id',notecontroller.adminnotificationDisplaybyId)
router.delete('/adminnotificationDelete/:id',notecontroller.adminnotificationDelete)


module.exports = router;