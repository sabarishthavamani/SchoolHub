const express = require('express')
const isEmpty = require('is-empty')
const router = express.Router()
//config
const passportAuth = require('../config/passport')
//validation
const driverValid = require('../validation/driver.validation')
//controller
const driverCtrl = require('../controller/driver.controller')
//routes
//driver-login
router.route('/driver-register').post(driverValid.driverregisterValid,driverCtrl.createdriver);
router.route('/driver-login').post(driverValid.driverloginValid,driverCtrl.driverLogin);
router.route('/driver-forgetpassword').post(driverValid.forgetpasswordValid,driverCtrl.forgetpassword);
router.route('/driver-resetpassword').post(driverValid.resetpasswordValid,driverCtrl.resetpassword);
router.route('/driver-changepassword').post(driverValid.changepasswordValid, driverCtrl.changePassword);

module.exports = router;

