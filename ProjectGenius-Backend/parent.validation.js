const isEmpty = require('is-empty');

const parentloginValid = (req, res, next) => {
    let errors = {};
    if (isEmpty(req.body.fatherphonenumber)) {
        errors.fatherphonenumber = 'Please Enter Your Registered PhoneNumber'
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
    let fatherphonenumberRegax = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    let dobRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (isEmpty(req.body.fatherphonenumber)) {
        errors.fatherphonenumber = 'Please Enter Your Phone Number'
    } 
    // else if (!(fatherphonenumberRegax).test(req.body.fatherphonenumber)) {
    //     errors.fatherphonenumber = 'Please Enter a Valid Email Address';
    // }
    if (isEmpty(req.body.dob)) {
        errors.dob = 'Please Enter Your Son (or) Daughter Date og Birth'
    }
    //  else if (!(dobRegax).test(req.body.dob)) {
    //     errors.dob = 'Please Enter a Valid Email Address';
    // }
    if (isEmpty(req.body.password)) {
        errors.password = 'Please Create Your Password'
    } 
    // else if (!passwordRegex.test(req.body.password)) {
    //     errors.password = 'Password must have One Uppercase,Lowercase,numbers and special characters, Minimum 8 to Maximum 16 characters';
    // }
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

const changepasswordValid = (req, res, next) => {
    let errors = {};
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    console.log(req.body, '----req.body')
    if (isEmpty(req.body.password)) {
        errors.password = 'Please enter your password'
    } 

    if (isEmpty(req.body.newpassword)) {
        errors.newpassword = 'Please enter your  new password'
    } else if (!passwordRegex.test(req.body.newpassword)) {
        errors.newpassword = 'Password should be atleast One Uppercase, Lowercase, numbers and special characters, Minimum 8 to Maxximum 16 letters alloewd only';
    }

    if (isEmpty(req.body.confirmpassword)) {
        errors.confirmpassword = 'Please re-enter your new password'
    } else if (req.body.newpassword != req.body.confirmpassword) {
        errors.confirmpassword = 'Confirm Password Not Same';
    }

    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }
    return next();
}
const forgetpasswordValid = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your email'
    }

    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }
    return next();
}
const resetpasswordValid = (req, res, next) => {
    let errors = {};
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
 
    if (isEmpty(req.body.newpassword)) {
        errors.newpassword = 'Please enter your  new password'
    } else if (!passwordRegex.test(req.body.newpassword)) {
        errors.newpassword = 'Password should be atleast One Uppercase, Lowercase, numbers and special characters, Minimum 8 to Maxximum 16 letters alloewd only';
    }

    if (isEmpty(req.body.confirmpassword)) {
        errors.confirmpassword = 'Please re-enter your new password'
    } else if (req.body.newpassword != req.body.confirmpassword) {
        errors.confirmpassword = 'Confirm Password Not Same';
    }

    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }
    return next();
}




module.exports = {
    parentloginValid,
    parentregisterValid,
    changepasswordValid,
    forgetpasswordValid,
    resetpasswordValid 

}