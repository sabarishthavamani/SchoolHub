const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const Admin = require('../models/admin');
const Admission = require('../models/admission');
const FeeSetup = require('../models/feesetup');
const FeeCollection = require('../models/feescollection');
const FeesPaid = require('../models/feespaid')
const TeacherAdmission = require('../models/teacheradmission')

// config
const config = require('../config');

// lib
const sendMail = require('../lib/emailGateway');


const createadmin = async (req, res) => {
    let checkEmail = await Admin.findOne({ 'email': req.body.email }).lean()
    if (!isEmpty(checkEmail)) {
        return res.status(400).json({ 'status': false, 'errors': { 'email': 'Email already Exist' } })
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);

    let newUser = new Admin({
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

const generateVerificationCode = () => {
    // Generate a random 6-digit verification code
    return Math.floor(100000 + Math.random() * 100000).toString();
};

const adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ 'email': req.body.email }).lean(); // Assuming there's only one admin user
        if (!admin) {
            return res.status(400).json({ 'status': false, 'errors': { 'email': 'Invalid User EmailId' } });
        }

        const comparePassword = await bcrypt.compare(req.body.password, admin.password);
        if (!comparePassword) {
            return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
        }

        // Generate a 6-digit verification code
        const verificationCode = generateVerificationCode();

        // Save the verification code to the admin's account
        await Admin.updateOne({ '_id': admin._id }, { 'verificationCode': verificationCode });

        // Send the verification code via email
        const emailContent = `
            Your 6-digit verification code is: ${verificationCode}
            Please use this code to verify your email address.
        `;

        sendMail({
            to: admin.email, // Use the admin's email address
            content: emailContent,
        });

        let payload = { _id: admin._id }
        let token = jwtSign(payload)
        return res.status(200).json({ 'status': true, 'message': `A 6-Digit Verification Code send to ${admin.email}`, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' });
    }
};
const ReverifyCode = async (req, res) => {
    try {
        const admin = await Admin.findOne({}).lean();
        console.log(admin, '---admin111')
        const myemail = admin.email
        const verificationCode = generateVerificationCode();

        // Save the verification code to the admin's account
        await Admin.updateOne({ '_id': admin._id }, { 'verificationCode': verificationCode });

        // Send the verification code via email
        const emailContent = `
            Your 6-digit verification code is: ${verificationCode}
            Please use this code to verify your email address.
        `;

        sendMail({
            to: admin.email, // Use the admin's email address
            content: emailContent,
        });
        return res.status(200).json({ 'status': true, 'message': `A 6-Digit Verification Code send to ${admin.email}`, myemail });
    } catch (err) {
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' })
    }
}


const verifyCode = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        const admin = await Admin.findOne({}).lean();
        if (!admin) {
            return res.status(400).json({ 'status': false, 'message': 'Admin user not found' });
        }

        if (admin.verificationCode !== verificationCode) {
            return res.status(400).json({ 'status': false, 'errors': { 'verificationCode': ' Wrong passcode,please re-enter correct one' } });
        }

        await Admin.updateOne({ '_id': admin._id }, { 'verificationCode': null });
        return res.status(200).json({ 'status': true, 'message': 'Verification successfull' });
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

const registerStudent = async (req, res) => {
    // let checkprimaryPhone = await Admission.findOne({ 'contactNumber': req.body.contactNumber }, { 'contactNumber': 1 }).lean();
    // if (!isEmpty(checkprimaryPhone)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'contactNumber': 'Phone Nunmber already exist' },'message': 'Same Mobile Number  already registered,please go and check in previous page' })
    // }
    // let checksecondaryPhone = await Admission.findOne({ 'emergencycontactNumber': req.body.emergencycontactNumber }, { 'emergencycontactNumber': 1 }).lean();
    // if (!isEmpty(checksecondaryPhone)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'emergencycontactNumber': 'Phone Number already exist' },'message': 'Same Mobile Number  already registered,please go and check in previous page' })
    // }
    // let checkwhatsappNo = await Admission.findOne({ 'whatsappNumber': req.body.whatsappNumber }, { 'whatsappNumber': 1 }).lean();
    // if (!isEmpty(checkwhatsappNo)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'whatsappNumber': 'whatsapp Number already exist' }, })
    // }
    // let checkfatherphonenumber = await Admission.findOne({ 'fatherphonenumber': req.body.fatherphonenumber }, { 'fatherphonenumber': 1 }).lean();
    // if (!isEmpty(checkfatherphonenumber)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'fatherphonenumber': 'Same Phone Number already exist' } })
    // }
    // let checkmotherphonenumber = await Admission.findOne({ 'motherphonenumber': req.body.motherphonenumber }, { 'motherphonenumber': 1 }).lean();
    // if (!isEmpty(checkmotherphonenumber)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'motherphonenumber': 'Same Phone Number already exist' } })
    // }
    // let checkaadhaarNo = await Admission.findOne({ 'aadhaarNumber': req.body.aadhaarNumber }, { 'aadhaarNumber': 1 }).lean();
    // if (!isEmpty(checkaadhaarNo)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'aadhaarNumber': 'Aadhaar Number already exist' }, 'message': 'Same Aadhaar Number  already registered,please go and check in previous page' })
    // }
    // let checkEmail = await Admission.findOne({ 'email': req.body.email }, { 'email': 1 }).lean();
    // if (!isEmpty(checkEmail)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'email': 'Email Id already exist' }, 'message': 'Same EmailId  already registered,please go and check in previous page' })
    // }
    // let checkAddress = await Admission.findOne({ 'permanentaddress': req.body.permanentaddress }, { 'permanentaddress': 1 }).lean();
    // if (!isEmpty(checkAddress)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'permanentaddress': 'permanentaddress  already exist' } })
    // }
    // let checkAddress2 = await Admission.findOne({ 'temporaryaddress': req.body.temporaryaddress }, { 'temporaryaddress': 1 }).lean();
    // console.log(checkAddress2, '----add')
    // if (!isEmpty(checkAddress2)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'temporaryaddress': 'temporaryaddress  already exist' } })
    // }
    const maxStudent = await Admission.findOne({}, { studentId: 1 }).sort({ studentId: -1 });
    console.log(maxStudent, '---studenttt');

    // Calculate the next student ID
    let nextStudentId = 'G0001'; // Default starting value

    if (maxStudent && maxStudent.studentId) {
        const currentMaxId = maxStudent.studentId;
        const seriesNumber = parseInt(currentMaxId.substring(1), 10) + 1;
        nextStudentId = `G${seriesNumber.toString().padStart(4, '0')}`;
        console.log(nextStudentId, '---studentId222');
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const surName = req.body.surName;

    let FullName = `${firstName} ${lastName}`;

    if (surName !== undefined && surName !== "") {
        FullName += ` ${surName}`;
    }
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    let newDoc = new Admission({
        'studentId': nextStudentId,
        'name': FullName,
        'dob': req.body.dob,
        'age': req.body.age,
        'email': req.body.email,
        'photo': req.files.photo[0].filename,
        'emergencycontactNumber': req.body.emergencycontactNumber,
        'contactNumber': req.body.contactNumber,
        'whatsappNumber': req.body.whatsappNumber,
        'signature': req.files.signature[0].filename,
        'vaccination': req.body.vaccination,
        'placeofbirth': req.body.placeofbirth,
        'aadhaarNumber': req.body.aadhaarNumber,
        'permanentaddress': req.body.permanentaddress,
        'temporaryaddress': req.body.temporaryaddress,
        'bloodgroup': req.body.bloodgroup,
        'admissiongrade': req.body.admissiongrade,
        'previousgrade': req.body.previousgrade,
        'previousschoolhistory': req.body.previousschoolhistory,
        'emergencyrelationname': req.body.emergencyrelationname,
        'fathername': req.body.fathername,
        'mothername': req.body.mothername,
        'fatherphonenumber': req.body.fatherphonenumber,
        'motherphonenumber': req.body.motherphonenumber,
        'doj': formattedDate
    })

    await newDoc.save();
    return res.status(200).json({ 'status': true, 'message': " Register successfully" })
}
const viewStudent = async (req, res) => {
    try {
        const studentView = await Admission.find({}).lean();
        return res.status(200).json({ 'status': true, 'result': studentView, 'imageUrl': config.IMAGE.USER_FILE_URL_PATH })
    } catch (err) {
        return res.status(500).json({ 'status': false, 'message': 'Error on server' })
    }
}
const deleteStudent = async (req, res) => {

    if (isEmpty(req.params.id)) {
        return res.status(400).json({ 'status': false, 'message': "_Id is empty" })
    }

    let deletedata = await Admission.deleteOne({ _id: req.params.id });
    if (deletedata && deletedata.deletedCount != 0) {
        return res.status(200).json({ 'status': true, 'message': "Data Deleted successfully" })
    }

    return res.status(200).json({ 'status': true, 'message': "Already Deleted" })
}

const getSingleStudent = async (req, res) => {
    try {
        let studentData = await Admission.findOne({ _id: req.params.id }).lean();
        const [firstName, ...lastName] = studentData.name.split(" ");
        const LastName = lastName.join(" ");
        studentData.firstName = firstName;
        studentData.lastName = LastName;
        // Add the image URLs
        studentData.photo = `${config.IMAGE.USER_FILE_URL_PATH}/${studentData.photo}`;
        studentData.signature = `${config.IMAGE.USER_FILE_URL_PATH}/${studentData.signature}`;
        // studentData.photoOriginalName = studentData.photo;
        // studentData.signatureOriginalName = studentData.signature;
        return res.status(200).json({ 'status': true, 'result': studentData });
    } catch (err) {
        return res.status(500).json({ 'status': false });
    }
}

const updateStudent = async (req, res) => {
    try {

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const surName = req.body.surName;

        let FullName = `${firstName} ${lastName}`;

        if (surName !== undefined && surName !== "") {
            FullName += ` ${surName}`;
        }
        let updateDoc = {
            'name': FullName,
            'dob': req.body.dob,
            'age': req.body.age,
            'email': req.body.email,
            'emergencycontactNumber': req.body.emergencycontactNumber,
            'contactNumber': req.body.contactNumber,
            'whatsappNumber': req.body.whatsappNumber,
            'vaccination': req.body.vaccination,
            'placeofbirth': req.body.placeofbirth,
            'aadhaarNumber': req.body.aadhaarNumber,
            'permanentaddress': req.body.permanentaddress,
            'temporaryaddress': req.body.temporaryaddress,
            'bloodgroup': req.body.bloodgroup,
            'admissiongrade': req.body.admissiongrade,
            'previousgrade': req.body.previousgrade,
            'previousschoolhistory': req.body.previousschoolhistory,
            'emergencyrelationname': req.body.emergencyrelationname,
            'fathername': req.body.fathername,
            'mothername': req.body.mothername,
            'fatherphonenumber': req.body.fatherphonenumber,
            'motherphonenumber': req.body.motherphonenumber,
        }

        if (!isEmpty(req.files) && req.files.photo && req.files.photo.length > 0) {
            updateDoc.photo = req.files.photo[0].filename;
        }

        if (!isEmpty(req.files) && req.files.signature && req.files.signature.length > 0) {
            updateDoc.signature = req.files.signature[0].filename;
        }

        let userData = await Admission.findOneAndUpdate({ _id: req.body.Id }, { '$set': updateDoc }, { new: true });
        console.log(userData, '.....user');
        return res.status(200).json({ 'status': true, 'message': "Data Updated successfully" })
    } catch (err) {
        console.log(err, '--err')
        return res.status(500).json({ 'status': false, 'message': 'error on server' })
    }
}
const createFeeSetup = async (req, res) => {
    try {

        let newDocument = new FeeSetup({
            'grade': req.body.grade,
            'term1': req.body.term1,
            'term2': req.body.term2,
            'term3': req.body.term3,

        })
        await newDocument.save();
        console.log(newDocument, '--doc')
        return res.status(200).json({ 'status': true, 'message': 'Feesetup saved successfully' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' });
    }
}
const findFeeSetup = async (req, res) => {
    try {
        let newDocument = await FeeSetup.find({}).lean();
        console.log(newDocument, '---fees')
        return res.status(200).json({ 'status': true, 'result': newDocument })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' });
    }
}
const createFeeCollection = async (req, res) => {
    try {
        console.log(req.body, '---body');

        // Retrieve the FeeSetup document for the selected grade
        const feeSetup = await FeeSetup.findOne({ grade: req.body.grade });

        if (!feeSetup) {
            return res.status(400).json({ status: false, message: 'Fee setup not found for the selected grade' });
        }
        // Get the selected terms from the request
        const selectedTerms = req.body.paymentterm; // Use the selected terms from the request

        // Calculate the due amount based on the selected terms
        let totalDueAmount = 0;

        selectedTerms.forEach((term) => {
            if (term in feeSetup) {
                totalDueAmount += feeSetup[term];
            }
        });

        // Create the fee collection document with the calculated due amount
        const newDocument = new FeeCollection({
            name: req.body.name,
            studentId: req.body.studentId,
            dueamount: totalDueAmount,
            paymentterm: selectedTerms, // Use the selected terms
            grade: req.body.grade,
        });

        await newDocument.save();
        console.log(newDocument, '--doc');
        return res.status(200).json({ status: true, message: 'Choose payment type, Proceed to payment', result: newDocument });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: 'Error on the server' });
    }
};

const feesPaid = async (req, res) => {
    try {
        console.log(req.body,'----bodyyy')
        const balanceamount =( parseFloat(req.body.total)-parseFloat(req.body.amountpaid)).toFixed(2)
        const newDocument = new FeesPaid({
            name: req.body.name,
            studentId: req.body.studentId,
            dueamount: req.body.dueamount,
            total: req.body.total,
            amountpaid: req.body.amountpaid,
            balanceamount :  balanceamount,
        });
        await newDocument.save();
        return res.status(200).json({ 'status': true, 'message': 'Amount Paid successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' });
    }
}

const feePayment = async (req, res) => {
    try {
        console.log(req.params, '---params')
        const result = await FeeCollection.findOne({ 'name': req.params.name }).lean();
        console.log(result, '---res');
        return res.status(200).json({ 'status': true, 'result': result });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' });
    }
}

const registerTeacher = async (req, res) => {
    // let checkprimaryPhone = await TeacherAdmission.findOne({ 'phoneNumber': req.body.phoneNumber }, { 'phoneNumber': 1 }).lean();
    // if (!isEmpty(checkprimaryPhone)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'phoneNumber': 'Phone Nunmber already exist' },'message': 'Same Mobile Number  already registered,please go and check in previous page' })
    // }
    // let checkemergencyPhone = await TeacherAdmission.findOne({ 'emergencycontactNumber': req.body.emergencycontactNumber }, { 'emergencycontactNumber': 1 }).lean();
    // if (!isEmpty(checkemergencyPhone)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'emergencycontactNumber': 'Phone Number already exist' },'message': 'Same Mobile Number  already registered,please go and check in previous page' })
    // }
    // let checkwhatsappNo = await TeacherAdmission.findOne({ 'whatsappNumber': req.body.whatsappNumber }, { 'whatsappNumber': 1 }).lean();
    // if (!isEmpty(checkwhatsappNo)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'whatsappNumber': 'whatsapp Number already exist' },'message': 'Same Whatsapp Number  already registered,please go and check in previous page' })
    // }
    // let checkfatherphonenumber = await TeacherAdmission.findOne({ 'fatherphonenumber': req.body.fatherphonenumber }, { 'fatherphonenumber': 1 }).lean();
    // if (!isEmpty(checkfatherphonenumber)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'fatherphonenumber': 'Same Phone Number already exist' },'message': 'Same Mobile Number  already registered,please go and check in previous page' })
    // }
    // let checkmotherphonenumber = await TeacherAdmission.findOne({ 'motherphonenumber': req.body.motherphonenumber }, { 'motherphonenumber': 1 }).lean();
    // if (!isEmpty(checkmotherphonenumber)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'motherphonenumber': 'Same Phone Number already exist' },'message': 'Same Mobile Number  already registered,please go and check in previous page' })
    // }
    // let checkEmail = await TeacherAdmission.findOne({ 'email': req.body.email }, { 'email': 1 }).lean();
    // if (!isEmpty(checkEmail)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'email': 'Email Id already exist' }, 'message': 'Same EmailId  already registered,please go and check in previous page' })
    // }
    // let checkAddress = await TeacherAdmission.findOne({ 'permanentaddress': req.body.permanentaddress }, { 'permanentaddress': 1 }).lean();
    // if (!isEmpty(checkAddress)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'permanentaddress': 'permanentaddress  already exist' },'message': 'Same Address already registered,please go and check in previous page' })
    // }
    // let checkAddress2 = await TeacherAdmission.findOne({ 'temporaryaddress': req.body.temporaryaddress }, { 'temporaryaddress': 1 }).lean();
    // console.log(checkAddress2, '----add')
    // if (!isEmpty(checkAddress2)) {
    //     return res.status(400).json({ 'status': false, 'errors': { 'temporaryaddress': 'temporaryaddress  already exist' },'message': 'Same Address  already registered,please go and check in previous page' })
    // }
    const maxTeacher = await TeacherAdmission.findOne({}, { teacherId: 1 }).sort({ teacherId: -1 });
    let nextTeacherId = 'T0001'; 

    if (maxTeacher && maxTeacher.teacherId) {
        const currentMaxId = maxTeacher.teacherId;
        const seriesNumber = parseInt(currentMaxId.substring(1), 10) + 1;
        nextTeacherId = `T${seriesNumber.toString().padStart(4, '0')}`;
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    // const surName = req.body.surName;

    let FullName = `${firstName} ${lastName}`;

    // if (surName !== undefined && surName !== "") {
    //     FullName += ` ${surName}`;
    // }

    let newDoc = new TeacherAdmission({
        'teacherId': nextTeacherId,
        'name': FullName,
        'dob': req.body.dob,
        'age': req.body.age,
        'teachingexperience':req.body.teachingexperience,
        'email': req.body.email,
        'teacherphoto': req.files.teacherphoto[0].filename,
        'emergencycontactNumber': req.body.emergencycontactNumber,
        'phoneNumber': req.body.phoneNumber,
        'whatsappNumber': req.body.whatsappNumber,
        'teachersignature': req.files.teachersignature[0].filename,
        'vaccination': req.body.vaccination,
        'placeofbirth': req.body.placeofbirth,
        'aadhaarNumber': req.body.aadhaarNumber,
        'permanentaddress': req.body.permanentaddress,
        'temporaryaddress': req.body.temporaryaddress,
        'bloodgroup': req.body.bloodgroup,
        'higherqualification': req.body.higherqualification,
        'maritalstatus': req.body.maritalstatus,
        'teachingcertificates': req.body.teachingcertificates,
        'subjects': req.body.subjects,
        'fatherphonenumber': req.body.fatherphonenumber,
        'motherphonenumber': req.body.motherphonenumber,
        'currentsalary': req.body.currentsalary,     
    })

    await newDoc.save();
    return res.status(200).json({ 'status': true, 'message': " Register successfully" })
}
const teacheraadhaarValid = async (req,res) =>{
    try{
        let checkaadhaarNo = await TeacherAdmission.find({},{'aadhaarNumber':1}).lean();
        console.log(checkaadhaarNo,'---aadhaar')
            return res.status(200).json({ 'status': true, result:checkaadhaarNo})
    }catch(err){
       console.log(err,'---err')
    }
}
const studentaadhaarValid = async (req,res) =>{
    try{
        let checkaadhaarNo = await Admission.find({},{'aadhaarNumber':1}).lean();
        console.log(checkaadhaarNo,'---aadhaar')
            return res.status(200).json({ 'status': true, result:checkaadhaarNo})
    }catch(err){
       console.log(err,'---err')
    }
}
const ViewTeacher = async (req,res) =>{
    try {
        const teacherView = await TeacherAdmission.find({}).lean();
        return res.status(200).json({ 'status': true, 'result': teacherView, 'imageUrl': config.IMAGE.TEACHER_FILE_URL_PATH })
    } catch (err) {
        return res.status(500).json({ 'status': false, 'message': 'Error on server' })
    }
}

const deleteTeacher = async (req, res) => {

    if (isEmpty(req.params.id)) {
        return res.status(400).json({ 'status': false, 'message': "_Id is empty" })
    }

    let deletedata = await TeacherAdmission.deleteOne({ _id: req.params.id });
    if (deletedata && deletedata.deletedCount != 0) {
        return res.status(200).json({ 'status': true, 'message': "Data Deleted successfully" })
    }

    return res.status(200).json({ 'status': true, 'message': "Already Deleted" })
}
const updateTeacher = async (req, res) => {
    try {

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        let FullName = `${firstName} ${lastName}`;
        let updateDoc =({
            'name': FullName,
            'dob': req.body.dob,
            'age': req.body.age,
            'teachingexperience':req.body.teachingexperience,
            'email': req.body.email,
            'emergencycontactNumber': req.body.emergencycontactNumber,
            'phoneNumber': req.body.phoneNumber,
            'whatsappNumber': req.body.whatsappNumber,
            'vaccination': req.body.vaccination,
            'placeofbirth': req.body.placeofbirth,
            'aadhaarNumber': req.body.aadhaarNumber,
            'permanentaddress': req.body.permanentaddress,
            'temporaryaddress': req.body.temporaryaddress,
            'bloodgroup': req.body.bloodgroup,
            'higherqualification': req.body.higherqualification,
            'maritalstatus': req.body.maritalstatus,
            'teachingcertificates': req.body.teachingcertificates,
            'subjects': req.body.subjects,
            'fatherphonenumber': req.body.fatherphonenumber,
            'motherphonenumber': req.body.motherphonenumber,
            'currentsalary': req.body.currentsalary,    
        })

        if (!isEmpty(req.files) && req.files.teacherphoto && req.files.teacherphoto.length > 0) {
            updateDoc.teacherphoto = req.files.teacherphoto[0].filename;
        }

        if (!isEmpty(req.files) && req.files.teachersignature && req.files.teachersignature.length > 0) {
            updateDoc.teachersignature = req.files.teachersignature[0].filename;
        }

        let userData = await TeacherAdmission.findOneAndUpdate({ _id: req.body.Id }, { '$set': updateDoc }, { new: true });
        console.log(userData, '.....user');
        return res.status(200).json({ 'status': true, 'message': "Data Updated successfully" })
    } catch (err) {
        console.log(err, '--err')
        return res.status(500).json({ 'status': false, 'message': 'error on server' })
    }
}
const getSingleTeacher = async (req, res) => {
    try {
        let teacherData = await TeacherAdmission.findOne({ _id: req.params.id }).lean();
        const [firstName, ...lastName] = teacherData.name.split(" ");
        const LastName = lastName.join(" ");
        teacherData.firstName = firstName;
        teacherData.lastName = LastName;
        // Add the image URLs
        teacherData.teacherphoto = `${config.IMAGE.TEACHER_FILE_URL_PATH}/${teacherData.teacherphoto}`;
        teacherData.teachersignature = `${config.IMAGE.TEACHER_FILE_URL_PATH}/${teacherData.teachersignature}`;
        // teacherData.photoOriginalName = teacherData.photo;
        // teacherData.signatureOriginalName = teacherData.signature;
        return res.status(200).json({ 'status': true, 'result': teacherData });
    } catch (err) {
        return res.status(500).json({ 'status': false });
    }
}
module.exports = {
    adminLogin,
    verifyCode,
    jwtSign,
    jwtVerify,
    registerStudent,
    createadmin,
    ReverifyCode,
    viewStudent,
    deleteStudent,
    getSingleStudent,
    updateStudent,
    createFeeSetup,
    createFeeCollection,
    findFeeSetup,
    feePayment,
    feesPaid,
    registerTeacher,
    ViewTeacher,
    deleteTeacher,
    updateTeacher,
    getSingleTeacher,
    teacheraadhaarValid,
    studentaadhaarValid
};