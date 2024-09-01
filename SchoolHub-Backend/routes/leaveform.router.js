const leave = require('../controller/leaveform.controller')
const express = require('express')
const router = express.Router();


//Apply
router.post("/leaveapplication",leave.leaveapplication)

router.delete("/leaveapplicationDelete/:leaveDataListId/:id",leave.leaveapplicationDelete)
router.put("/leaveapplicationupdate/:leaveDataListId", leave.leaveapplicationupdate);


//Display
router.get("/leaveDisplay",leave.leaveDisplay)
router.get("/Leavelistmonth",leave.Leavelistmonth)
router.get("/leaveformDislay/:month",leave.leaveformDislay)


module.exports = router;

