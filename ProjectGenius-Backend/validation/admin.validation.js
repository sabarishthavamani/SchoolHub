const isEmpty = require('is-empty');

const loginValid = (req, res, next) => {
    let errors = {};
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your Registered Email Id'
    } else if (!(emailRegax).test(req.body.email)) {
        errors.email = 'Please enter a valid email address';
    }
    if (isEmpty(req.body.password)) {
        errors.password = 'Please enter your password'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}
const verifyValid = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.verificationCode)) {
        errors.verificationCode = 'Please enter 6-digit verificationcode';
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next()
}
const updateValid = (req, res, next) => {
    let errors = {};
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (isEmpty(req.body.firstName)) {
        errors.firstName = 'Please enter your firstName ';
    }
    if (isEmpty(req.body.lastName)) {
        errors.lastName = 'Please enter your lastName';
    }
    if (isEmpty(req.body.age)) {
        errors.age = 'Please enter your age ';
    }
    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your Email Id'
    } else if (!(emailRegax).test(req.body.email)) {
        errors.email = 'Please enter a valid email address(Ex:abc@gmail.com)';
    }
    if (isEmpty(req.body.previousgrade)) {
        errors.previousgrade = 'Please enter your previous Grade/Class';
    }
    if (isEmpty(req.body.dob)) {
        errors.dob = 'Please enter your date of Birth';
    }
    if (isEmpty(req.body.placeofbirth)) {
        errors.placeofbirth = 'Please enter your Place of Birth';
    }
    if (isEmpty(req.body.aadhaarNumber)) {
        errors.aadhaarNumber = 'Please enter your Aadhaar Number';
    } else if (req.body.aadhaarNumber.toString().length != 14) {
        errors.aadhaarNumber = 'Please enter a valid Aadhaar number it should have only 12 digits';
    }
    if (isEmpty(req.body.permanentaddress)) {
        errors.permanentaddress = 'Please enter your permanent Address';
    }
    if (isEmpty(req.body.temporaryaddress)) {
        errors.temporaryaddress = 'Please enter your temporary Address';
    }
    if (isEmpty(req.body.bloodgroup)) {
        errors.bloodgroup = 'Please enter your BloodGroup';
    }
    if (isEmpty(req.body.admissiongrade)) {
        errors.admissiongrade = 'Please select your admissiongrade';
    }
    if (isEmpty(req.body.previousschoolhistory)) {
        errors.previousschoolhistory = 'Please select your previousschoolhistory';
    }
    if (isEmpty(req.body.emergencyrelationname)) {
        errors.emergencyrelationname = 'Please select your emergencyrelationname';
    }
    if (isEmpty(req.body.fathername)) {
        errors.fathername = 'Please enter your Father name';
    }
    if (isEmpty(req.body.mothername)) {
        errors.mothername = 'Please enter your Mother name';
    }
    if (isEmpty(req.body.vaccination)) {
        errors.vaccination = 'Please select your vaccination';
    }
    if (isEmpty(req.body.contactNumber)) {
        errors.contactNumber = 'Please enter your  Phone Number';
    } else if (isNaN(req.body.contactNumber)) {
        errors.contactNumber = 'phone Number only allowed numeric';
    } else if (req.body.contactNumber.toString().length != 10) {
        errors.contactNumber = 'Please enter a valid phone number it should have only 10 digits';
    }
    if (isEmpty(req.body.emergencycontactNumber)) {
        errors.emergencycontactNumber = 'Please enter your Emergency Phone Number';
    } else if (isNaN(req.body.emergencycontactNumber)) {
        errors.emergencycontactNumber = 'phone Number only allowed numeric';
    } else if (req.body.emergencycontactNumber.toString().length != 10) {
        errors.emergencycontactNumber = 'Please enter a valid phone number it should have only 10 digits';
    }

    if (isEmpty(req.body.whatsappNumber)) {
        errors.whatsappNumber = 'Please enter your whatsapp Number';
    } else if (isNaN(req.body.whatsappNumber)) {
        errors.whatsappNumber = 'Whatsapp Number only allowed numeric';
    } else if (req.body.whatsappNumber.toString().length != 10) {
        errors.whatsappNumber = 'Please enter a valid whatsapp number it should have only 10 digits';
    }
    if (isEmpty(req.body.fatherphonenumber)) {
        errors.fatherphonenumber = 'Please enter your whatsapp Number';
    } else if (isNaN(req.body.fatherphonenumber)) {
        errors.fatherphonenumber = 'Phone Number only allowed numeric';
    } else if (req.body.fatherphonenumber.toString().length != 10) {
        errors.fatherphonenumber = 'Please enter a valid Phone number it should have only 10 digits';
    }
    if (isEmpty(req.body.motherphonenumber)) {
        errors.motherphonenumber = 'Please enter your whatsapp Number';
    } else if (isNaN(req.body.motherphonenumber)) {
        errors.motherphonenumber = 'Phone Number only allowed numeric';
    } else if (req.body.motherphonenumber.toString().length != 10) {
        errors.motherphonenumber = 'Please enter a valid Phone number it should have only 10 digits';
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors, 'message': 'Please fill all the required fields before submitting' })
    }
    return next()
}
const feecollectionValid = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.name)) {
        errors.name = 'Please Enter Student Name';
    }
    if (isEmpty(req.body.studentId)) {
        errors.studentId = 'Please Enter Student Id';
    }
    if (isEmpty(req.body.paymentterm)) {
        errors.paymentterm = 'Please Select Paymentterm ';
    }
    if (isEmpty(req.body.admissiongrade)) {
        errors.admissiongrade = 'Please Select Student Grade';
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }
    return next()
}
const feesetupValid = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.term1)) {
        errors.term1 = 'Please Enter Term1 Fees';
    }
    if (isEmpty(req.body.term2)) {
        errors.term2 = 'Please Enter Term2 Fees';
    }
    if (isEmpty(req.body.term3)) {
        errors.term3 = 'Please Enter Term3 Fees ';
    }
    if (isEmpty(req.body.admissiongrade)) {
        errors.admissiongrade = 'Please Select Student Grade';
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next()
}
const feesetupEditValid = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.term1)) {
        errors.term1 = 'Please Enter Term1 Fees';
    }
    if (isEmpty(req.body.term2)) {
        errors.term2 = 'Please Enter Term2 Fees';
    }
    if (isEmpty(req.body.term3)) {
        errors.term3 = 'Please Enter Term3 Fees ';
    }
    if (isEmpty(req.body.admissiongrade)) {
        errors.admissiongrade = 'Please Select Student Grade';
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next()
}
const teacherupdateValid = (req, res, next) => {
    let errors = {};
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (isEmpty(req.body.firstName)) {
        errors.firstName = 'Please enter your firstName ';
    }
    if (isEmpty(req.body.lastName)) {
        errors.lastName = 'Please enter your lastName';
    }
    if (isEmpty(req.body.age)) {
        errors.age = 'Please enter your age ';
    }
    if (isEmpty(req.body.maritalstatus)) {
        errors.maritalstatus = 'Please enter your maritalstatus ';
    }
    if (isEmpty(req.body.currentsalary)) {
        errors.currentsalary = 'Please enter your currentsalary ';
    }
    if (isEmpty(req.body.subjects)) {
        errors.subjects = 'Please enter your Subjects Taught';
    }
    if (isEmpty(req.body.teachingexperience)) {
        errors.teachingexperience = 'Please enter your teachingexperience ';
    }
    if (isEmpty(req.body.teachingcertificates)) {
        errors.teachingcertificates = 'Please enter your teachingcertificates ';
    }
    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your Email Id'
    } else if (!(emailRegax).test(req.body.email)) {
        errors.email = 'Please enter a valid email address(Ex:abc@gmail.com)';
    }
    if (isEmpty(req.body.higherqualification)) {
        errors.higherqualification = 'please enter your HigherQualification';
    }
    if (isEmpty(req.body.dob)) {
        errors.dob = 'Please enter your date of Birth';
    }
    if (isEmpty(req.body.placeofbirth)) {
        errors.placeofbirth = 'Please enter your Place of Birth';
    }
    if (isEmpty(req.body.aadhaarNumber)) {
        errors.aadhaarNumber = 'Please enter your Aadhaar Number';
    } else if (req.body.aadhaarNumber.toString().length != 14) {
        errors.aadhaarNumber = 'Please enter a valid Aadhaar number it should have only 12 digits';
    }
    if (isEmpty(req.body.permanentaddress)) {
        errors.permanentaddress = 'Please enter your permanent Address';
    }
    if (isEmpty(req.body.temporaryaddress)) {
        errors.temporaryaddress = 'Please enter your temporary Address';
    }
    if (isEmpty(req.body.bloodgroup)) {
        errors.bloodgroup = 'Please enter your BloodGroup';
    }
    if (isEmpty(req.body.vaccination)) {
        errors.vaccination = 'Please select your vaccination';
    }
    if (isEmpty(req.body.phoneNumber)) {
        errors.phoneNumber = 'Please enter your  Phone Number';
    } else if (isNaN(req.body.phoneNumber)) {
        errors.phoneNumber = 'phone Number only allowed numeric';
    } else if (req.body.phoneNumber.toString().length != 10) {
        errors.phoneNumber = 'Please enter a valid phone number it should have only 10 digits';
    }
    if (isEmpty(req.body.emergencycontactNumber)) {
        errors.emergencycontactNumber = 'Please enter your Emergency Phone Number';
    } else if (isNaN(req.body.emergencycontactNumber)) {
        errors.emergencycontactNumber = 'phone Number only allowed numeric';
    } else if (req.body.emergencycontactNumber.toString().length != 10) {
        errors.emergencycontactNumber = 'Please enter a valid phone number it should have only 10 digits';
    }

    if (isEmpty(req.body.whatsappNumber)) {
        errors.whatsappNumber = 'Please enter your whatsapp Number';
    } else if (isNaN(req.body.whatsappNumber)) {
        errors.whatsappNumber = 'Whatsapp Number only allowed numeric';
    } else if (req.body.whatsappNumber.toString().length != 10) {
        errors.whatsappNumber = 'Please enter a valid whatsapp number it should have only 10 digits';
    }

    if (isEmpty(req.body.fatherphonenumber)) {
        errors.fatherphonenumber = 'Please enter your whatsapp Number';
    } else if (isNaN(req.body.fatherphonenumber)) {
        errors.fatherphonenumber = 'Phone Number only allowed numeric';
    } else if (req.body.fatherphonenumber.toString().length != 10) {
        errors.fatherphonenumber = 'Please enter a valid Phone number it should have only 10 digits';
    }
    if (isEmpty(req.body.motherphonenumber)) {
        errors.motherphonenumber = 'Please enter your whatsapp Number';
    } else if (isNaN(req.body.motherphonenumber)) {
        errors.motherphonenumber = 'Phone Number only allowed numeric';
    } else if (req.body.motherphonenumber.toString().length != 10) {
        errors.motherphonenumber = 'Please enter a valid Phone number it should have only 10 digits';
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors, 'message': 'Please fill all the required fields before submitting' })
    }

    return next()
}
module.exports = { loginValid, verifyValid, updateValid, feecollectionValid, feesetupValid, feesetupEditValid, teacherupdateValid  }