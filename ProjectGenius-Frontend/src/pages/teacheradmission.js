import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';


//import actions
import { registerTeacher } from '../actions/userAction';

// import lib
import toastAlert from '../lib/toast';
//import components
import TeacherPersonal from './components/teacherpersonal';
import TeacherContact from './components/teachercontact';
import TeacherHistory from './components/teacherhistory';

const initialFormValue = {
    'firstName': '',
    'lastName': '',
    'currentsalary': '',
    'teachingexperience': '',
    'maritalstatus': '',
    'teachingcertificates': '',
    'subjects': '',
    'fatherphonenumber': '',
    'motherphonenumber': '',
    'dob': '',
    'age': '',
    'email': '',
    'placeofbirth': '',
    'aadhaarNumber': '',
    'permanentaddress': '',
    'temporaryaddress': '',
    'bloodgroup': '',
    'emergencycontactNumber': '',
    'phoneNumber': '',
    'vaccination': '',
    'whatsappNumber': '',
    'teachersignature': '',
    'teacherphoto': '',
    'higherqualification': '',
}

const Teacher = () => {
    const [currentForm, setCurrentForm] = useState(1);
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [data,setData] = useState('')

    const {
        firstName,
        lastName,
        dob,
        age,
        email,
       higherqualification,
        currentsalary,
        fatherphonenumber,
        motherphonenumber,
        placeofbirth,
        permanentaddress,
        temporaryaddress,
        bloodgroup,
        vaccination,
        phoneNumber,
        whatsappNumber,
        emergencycontactNumber,
        teachingexperience,
        maritalstatus,
        teachingcertificates,
        teachersignature,
        teacherphoto,
        subjects,
        aadhaarNumber,
    } = formValue;

    const navigate = useNavigate();

    const handleNextClick = () => {
        if (currentForm < 3) {
            setCurrentForm(currentForm + 1)
        }
    };

    const handlePreClick = () => {
        setCurrentForm(currentForm - 1)
    };

    const handleSubmit = async () => {

        try {
            let formData = new FormData();
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('higherqualification', higherqualification)
            formData.append('teachingexperience', teachingexperience)
            formData.append('dob', dob)
            formData.append('age', age)
            formData.append('email', email)
            formData.append('placeofbirth', placeofbirth)
            formData.append('permanentaddress', permanentaddress)
            formData.append('temporaryaddress', temporaryaddress)
            formData.append('bloodgroup', bloodgroup)
            formData.append('vaccination', vaccination)
            formData.append('phoneNumber', phoneNumber)
            formData.append('fatherphonenumber', fatherphonenumber)
            formData.append('motherphonenumber', motherphonenumber)
            formData.append('whatsappNumber', whatsappNumber)
            formData.append('emergencycontactNumber', emergencycontactNumber)
            formData.append('maritalstatus', maritalstatus)
            formData.append('teachingcertificates', teachingcertificates)
            formData.append('teachersignature', teachersignature)
            formData.append('teacherphoto', teacherphoto)
            formData.append('subjects', subjects)
            formData.append('aadhaarNumber', aadhaarNumber)
            formData.append('currentsalary', currentsalary);

            let { status, message, errors } = await registerTeacher(formData)
            if (status === true) {

                toastAlert('success', message)
                setFormValue(initialFormValue)
                setErrors({});
                navigate('/teacherview')
            }
            else if (status === false) {
                if (errors) {
                    setErrors(errors);
                }

                if (message) {
                    toastAlert('error', message)

                }
            }

        } catch (err) {

        }
    }
    const renderForm = () => {
        switch (currentForm) {
            case 1:
                return <TeacherPersonal formValue={formValue} setFormValue={setFormValue} handleNextClick={handleNextClick} errors={errors} />;
            case 2:
                return <TeacherContact  formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleNextClick={handleNextClick} errors={errors} />;
            case 3:
                return <TeacherHistory formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleSubmit={handleSubmit}  errors={errors} />;
            default:
                return null;
        }
    }
    return (
        <div className="teacher">
            <Sidebar />
            <div className="teacher-content">
                <Navbar pageTitle="New Teacher" />
                {renderForm()}
            </div>
        </div>

    )
}
export default Teacher;