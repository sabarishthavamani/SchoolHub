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

module.exports = router;