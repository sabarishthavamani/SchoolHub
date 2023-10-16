const isEmpty = require('is-empty');

const loginValid = (req, res, next) => {
    let errors = {};
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   

    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your Registered Email Id'
    }else if (!(emailRegax).test(req.body.email)) {
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
const registerValid = (req, res, next) => {
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
    }else if (!(emailRegax).test(req.body.email)) {
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
    }else if (req.body.aadhaarNumber.toString().length != 14) {
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
    // if (isEmpty(req.body.parentsoccupation)) {
    //     errors.parentsoccupation = 'Please select your parentsoccupation';
    // }
    if (isEmpty(req.body.emergencyrelationname)) {
        errors.emergencyrelationname = 'Please select your emergencyrelationname';
    }
    if (isEmpty(req.body.fathername)) {
        errors.fathername = 'Please enter your Father name';
    }
    if (isEmpty(req.body.mothername)) {
        errors.mothername = 'Please enter your Mother name';
    }
    // if (isEmpty(req.body.emergencyrelationtype)) {
    //     errors.emergencyrelationtype = 'Please select your emergencyrelationtype';
    // }
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

    if (isEmpty(req.files.signature)) {
        errors.signature = 'No file is chosen for the signature. Please select a file.';
      } else {
        const signatureFile = req.files.signature[0];
        const mimeType = signatureFile.mimetype;
        const split = mimeType.split('/');
        const fileType = split[1].toLowerCase();
        const fileSize = signatureFile.size;
      
        const allowedFileTypes = ['jpeg', 'png', 'jpg', 'pdf', 'docx', 'zip', 'tgz'];
        const minFileSize = 30 * 1024; // 30 KB in bytes
        const maxFileSize =  1024 * 1024; // 1 MB in bytes
        const docxMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
        if (!allowedFileTypes.includes(fileType) && mimeType !== docxMimeType) {
          errors.signature = 'Only upload a file with jpeg, jpg, png, pdf extension or .docx.';
        } else if (fileSize < minFileSize || fileSize > maxFileSize) {
          errors.signature = 'File size must be between 30 KB to 1 MB.';
        }
      }
      
      if (isEmpty(req.files.photo)) {
        errors.photo = 'No file is chosen for the photo. Please select a file.';
      } else {
        const photoFile = req.files.photo[0];
        const mimeType = photoFile.mimetype;
        const split = mimeType.split('/');
        const fileType = split[1].toLowerCase();
        const fileSize = photoFile.size;
      
        const allowedFileTypes = ['jpeg', 'png', 'jpg'];
        const minFileSize = 30 * 1024; // 30 KB in bytes
        const maxFileSize = 1024 * 1024; // 1 MB in bytes
      
        if (!allowedFileTypes.includes(fileType)) {
          errors.photo = 'Only upload a file with jpeg, jpg, or png extension.';
        } else if (fileSize < minFileSize || fileSize > maxFileSize) {
          errors.photo = 'File size must be between 30 KB to 1 MB.';
        }
      }
      
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors, 'message':'Please fill all the required fields before submitting' })
    }

    return next()
}
module.exports = { loginValid, verifyValid, registerValid }