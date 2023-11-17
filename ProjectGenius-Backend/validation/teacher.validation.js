const isEmpty = require('is-empty');

const teacherloginValid = (req, res, next) => {
    let errors = {};
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your Registered Email Id'
    } else if (!(emailRegax).test(req.body.email)) {
        errors.email = 'Please enter a valid email addressEx(abc123@gmail.com)';
    }
    if (isEmpty(req.body.password)) {
        errors.password = 'Please enter your password'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}
const teacherregisterValid = (req, res, next) => {
    let errors = {};
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your Email Id'
    } else if (!(emailRegax).test(req.body.email)) {
        errors.email = 'Please enter a valid email address Ex(abc123@gmail.com)';
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
const findsectionValid = (req,res,next) =>{
    let errors = {};

    if (isEmpty(req.body.section)) {
      errors.section ='Please select the section'
    }
    if (isEmpty(req.body.admissiongrade)) {
        errors.admissiongrade ='Please select the grade'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}

module.exports = {
    teacherloginValid,
    teacherregisterValid,
    findsectionValid
}