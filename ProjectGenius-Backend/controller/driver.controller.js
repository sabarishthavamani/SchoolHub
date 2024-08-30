const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// lib
const sendMail = require('../lib/emailGateway');
//Models
const driversignup = require('../models/driversignup');

const driveradmission = require('../models/driver')
//config
const config = require('../config/index');
//control functions

const createdriver = async (req, res) => {
    try {
        let checkEmail = await driveradmission.findOne({ 'driverId': req.body.driverId }, { email: 1,dob: 1}).lean();
        
        if (!checkEmail) {
            return res.status(400).json({ 'status': false, 'message': 'Driver not found with provided driver Details' });
        }

        let checkdriverId = await driversignup.findOne({ 'driverId': req.body.driverId }).lean();
        if (checkdriverId) {
            return res.status(400).json({ 'status': false, 'message': 'Same driver are already Exist'  });
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        let newUser = new driversignup({
            'driverId': req.body.driverId,
            'password' : hash,
        });

        await newUser.save();
        return res.status(200).json({ 'status': true, 'message': 'Registered successfully', newUser });
    } catch (error) {
        console.error("Error occurred during driver signup:", error);
        return res.status(500).json({ 'status': false, 'message': 'Internal server error' });
    }
};



const driverLogin = async (req, res) => {
    try {
        const driver = await driversignup.findOne({'driverId' : req.body.driverId}).lean();
        const driverData = await driveradmission.findOne({ 'driverId': req.body.driverId }).lean();
        driverData.driverphoto = `${config.IMAGE.DRIVER_FILE_URL_PATH}/${driverData.driverphoto}`;

        if (!driver) {
            return res.status(400).json({ 'status': false, 'errors': { 'teacherId': 'Invalid DriverId' } });
        }
        const comparePassword = await bcrypt.compare(req.body.password, driver.password);
        if (!comparePassword) {
            return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
        }
        let payload = { _id: driver._id }
        let token = jwtSign(payload)
        return res.status(200).json({ 'status': true, 'message': 'Login Successfully', token , result : driverData});
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

    let checkUser = await driversignup.findOne({ 'id': req.body.id }).lean();
    if (!checkUser) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid User' });
    }
    const comparePassword = await bcrypt.compare(req.body.password, checkUser.password);
    if (!comparePassword) {
        return res.status(400).json({ 'status': false, 'errors': { 'password': 'Your Old Password is Wrong.' } });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const changepassword = await driversignup.findOneAndUpdate({ id: req.body.id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" ,result : changepassword })
}

//Forgotpassword

const forgetpassword = async (req, res) => {
    let find = await driveradmission.findOne({ 'email': req.body.email }).lean();
    if(isEmpty(find)) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid EmailId' })
    }
    sendMail({
        to: req.body.email,
        content: `<a target="_self" href="http://localhost:3000/driver-resetpassword/${find._id}"><span>To Reset your Password</span> >>> Click here</a>`
    })
    return res.status(200).json({ 'status': true, 'message': `Please Check the Message Received in : ${find.email}` })
}

const resetpassword = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const resetpassword = await driversignup.findOneAndUpdate({ _id: req.body._id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" , result : resetpassword})
}


module.exports = {
    createdriver,
    driverLogin,
    changePassword,
    forgetpassword,
    resetpassword,
    jwtSign,
    jwtVerify
}