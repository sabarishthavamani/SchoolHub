const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// lib
const sendMail = require('../lib/emailGateway');
//Models
const Teacher = require('../models/teachersignup');
const Section = require('../models/section');
const Attendance = require('../models/attendance');
const GroupSection = require('../models/groupsection');
//config
const config = require('../config/index');
//control functions
const createteacher = async (req, res) => {
    let checkEmail = await Teacher.findOne({ 'email': req.body.email }).lean()
    if (!isEmpty(checkEmail)) {
        return res.status(400).json({ 'status': false, 'errors': { 'email': 'Same Email Id already Exist' } })
    }
    //passwordhashing
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let newUser = new Teacher({
        'email': req.body.email,
        'password': hash
    })
    await newUser.save();
    sendMail({
        'to': req.body.email,
        'content': '<h1>Registered successfully..!</h1>'
    })

    return res.status(200).json({ 'status': true, 'message': 'Registered successfully' })

}
const teacherLogin = async (req, res) => {
    try {
        const admin = await Teacher.findOne({ 'email': req.body.email }).lean(); 
        if (!admin) {
            return res.status(400).json({ 'status': false, 'errors': { 'email': 'Invalid User EmailId' } });
        }
        const comparePassword = await bcrypt.compare(req.body.password, admin.password);
        if (!comparePassword) {
            return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
        }
        let payload = { _id: admin._id }
        let token = jwtSign(payload)
        return res.status(200).json({ 'status': true, 'message': 'Login Successfully', token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' });
    }
};
const jwtSign = (payload) => {
    let token = jwt.sign(payload, config.SECRET_KEY);
    return token;
}
const jwtVerify = (token) => {
    try {
        token = token.replace('Bearer ', '');
        let decoded = jwt.verify(token, config.SECRET_KEY);
        if (decoded) {
            return {
                'status': true,
                decoded
            }
        }

    } catch (err) {
        return {
            'status': false
        }
    }
}
const findSection = async (req, res) => {
    try {
        const { section, admissiongrade } = req.body;
        console.log(req.body,'---body')
        let checksection = await GroupSection.findOne({ section,admissiongrade }).lean()
        console.log(checksection,'----sec')
        if (isEmpty(checksection)) {
            return res.status(400).json({ 'status': false, 'errors': { 'section': 'Selected Section Not Exist' } })
        }
        const result = await GroupSection.find({ section, admissiongrade },{students:1}).lean();
        console.log(result,'---result')
        return res.status(200).json({ 'status': true, 'result': result });
    } catch (err) {
        console.log(err,'--err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}
const dailyattendance = async (req,res) =>{
    try{
        const attendanceData  = new Attendance ({
            'admissiongrade':req.body.admissiongrade,
            'section':req.body.section,
            'date':req.body.date,
             'attendance':req.body.attendance
        })
        await attendanceData.save()
        console.log(attendanceData,'---data')
        return res.status(200).json({'status':true,'message':`Attendence for ${req.body.date} submitted successfully`})
    }catch(err) {
        console.log(err,'---err')
        return res.status(500).json({'status':false,'message':'Error on the Server'});
    }
} 
module.exports ={
    createteacher,
    teacherLogin,
    jwtSign,
    jwtVerify,
    findSection,
    dailyattendance
}