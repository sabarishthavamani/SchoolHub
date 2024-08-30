const express = require('express')
const isEmpty = require('is-empty')
const router = express.Router()
//config
const passportAuth = require('../config/passport')
//validation
const parentValid = require('../validation/parent.validation')
//controller
const parentCtrl = require('../controller/parent.controller')
//routes
//parent-login
router.route('/parent-register').post(parentValid.parentregisterValid,parentCtrl.createparent);
router.route('/parent-login').post(parentValid.parentloginValid,parentCtrl.parentLogin);
router.route('/parent-forgetpassword').post(parentValid.forgetpasswordValid,parentCtrl.forgetpassword);
router.route('/parent-resetpassword').post(parentValid.resetpasswordValid,parentCtrl.resetpassword);
router.route('/parent-changepassword').post(parentValid.changepasswordValid, parentCtrl.changePassword);

module.exports = router;