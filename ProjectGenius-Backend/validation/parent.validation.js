const isEmpty = require('is-empty');

const parentloginValid = (req, res, next) => {
    let errors = {};
    if (isEmpty(req.body.email)) {
        errors.email = 'Please Enter Your Registered EmailId'
    }
    if (isEmpty(req.body.password)) {
        errors.password = 'Please Enter Your Password'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}
const parentregisterValid = (req, res, next) => {
    let errors = {};
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (isEmpty(req.body.email)) {
        errors.email = 'Please Enter Your Registered Email Id'
    } else if (!(emailRegax).test(req.body.email)) {
        errors.email = 'Please Enter a Valid Email Address';
    }
    if (isEmpty(req.body.password)) {
        errors.password = 'Please Create Your Password'
    } else if (!passwordRegex.test(req.body.password)) {
        errors.password = 'Password must have One Uppercase,Lowercase,numbers and special characters, Minimum 8 to Maximum 16 characters';
    }
    if (isEmpty(req.body.confirmpassword)) {
        errors.confirmpassword = 'Please Re-enter Your Confirmpassword'
    }
    if ((req.body.confirmpassword !== req.body.password)) {
        errors.confirmpassword = 'Password and Confirm Password are not same'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}

module.exports = {
    parentloginValid,
    parentregisterValid
}