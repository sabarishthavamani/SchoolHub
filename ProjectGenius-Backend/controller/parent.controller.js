const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// lib
const sendMail = require('../lib/emailGateway');
//Models
const Parent = require('../models/parentsignup');
//config
const config = require('../config/index');
//control functions
const createparent = async (req, res) => {
    let checkEmail = await Parent.findOne({ 'email': req.body.email }).lean()
    if (!isEmpty( checkEmail)) {
        return res.status(400).json({ 'status': false, 'errors': { 'email': 'Same Email Id Already Exist' } })
    }
    //passwordhashing
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);

    let newUser = new Parent({
        'email':req.body.email,
        'password': hash
    })
    await newUser.save();
    return res.status(200).json({ 'status': true, 'message': 'Registered successfully' })

}
const parentLogin = async (req, res) => {
    try {
        const parent = await Parent.findOne({ 'email': req.body.email }).lean();
        if (!parent) {
            return res.status(400).json({ 'status': false, 'errors': { 'teacherId': 'Invalid User Id' } });
        }
        const comparePassword = await bcrypt.compare(req.body.password, parent.password);
        if (!comparePassword) {
            return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
        }
        let payload = { _id: parent._id }
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

module.exports = {
    createparent,
    parentLogin,
    jwtSign,
    jwtVerify
}