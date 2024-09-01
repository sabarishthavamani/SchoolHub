const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// lib
const sendMail = require('../lib/emailGateway');
//Models
const Parent = require('../models/parentsignup');
const studentadmission = require('../models/admission')
//config
const config = require('../config/index');
//control functions

const createparent = async (req, res) => {
    try {
        let checkEmail = await studentadmission.findOne({ 'fatherphonenumber': req.body.fatherphonenumber, 'dob': req.body.dob }, { email: 1,dob: 1}).lean();
        
        if (!checkEmail) {
            return res.status(400).json({ 'status': false, 'message': 'Student not found with provided father phone number and date of birth' });
        }

        let checkstudentId = await Parent.findOne({ 'fatherphonenumber': req.body.fatherphonenumber }).lean();
        if (checkstudentId) {
            return res.status(400).json({ 'status': false, 'message': 'Same student parents are already Exist'  });
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        let newUser = new Parent({
            'password' : hash,
            'fatherphonenumber': req.body.fatherphonenumber,
            'dob' : req.body.dob,
        });

        await newUser.save();
        return res.status(200).json({ 'status': true, 'message': 'Registered successfully', newUser });
    } catch (error) {
        console.error("Error occurred during student signup:", error);
        return res.status(500).json({ 'status': false, 'message': 'Internal server error' });
    }
};



const parentLogin = async (req, res) => {
    try {
        const parent = await Parent.findOne({ 'fatherphonenumber': req.body.fatherphonenumber }).lean();
        const studentData = await studentadmission.findOne({ 'fatherphonenumber': req.body.fatherphonenumber }, { name: 1,photo : 1, email: 1 ,studentId : 1,fathername:1,vehicleRoute : 1, admissiongrade:1}).lean();
        studentData.photo = `${config.IMAGE.USER_FILE_URL_PATH}/${studentData.photo}`;

        if (!parent) {
            return res.status(400).json({ 'status': false, 'errors': { 'teacherId': 'Invalid User Phone Number' } });
        }
        const comparePassword = await bcrypt.compare(req.body.password, parent.password);
        if (!comparePassword) {
            return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
        }
        let payload = { _id: parent._id }
        let token = jwtSign(payload)
        return res.status(200).json({ 'status': true, 'message': 'Login Successfully', token , result : studentData});
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



const changePassword = async (req, res) => {

    let checkUser = await Parent.findOne({ 'id': req.body.id }).lean();
    if (!checkUser) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid User' });
    }
    const comparePassword = await bcrypt.compare(req.body.password, checkUser.password);
    if (!comparePassword) {
        return res.status(400).json({ 'status': false, 'errors': { 'password': 'Your Old Password is Wrong.' } });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const changepassword = await Parent.findOneAndUpdate({ id: req.body.id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" ,result : changepassword })
}

const forgetpassword = async (req, res) => {
    let find = await studentadmission.findOne({ 'email': req.body.email }).lean();
    if(isEmpty(find)) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid EmailId' })
    }
    sendMail({
        to: req.body.email,
        content: `<a target="_self" href="http://localhost:3000/student-resetpassword/${find._id}"><span>To Reset your Password</span> >>> Click here</a>`
    })
    return res.status(200).json({ 'status': true, 'message': `Please Check the Message Received in : ${find.email}` })
}

const resetpassword = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const resetpassword = await studentsignup.findOneAndUpdate({ _id: req.body._id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" , result : resetpassword})
}


module.exports = {
    createparent,
    parentLogin,
    changePassword,
    forgetpassword,
    resetpassword,
    jwtSign,
    jwtVerify
}