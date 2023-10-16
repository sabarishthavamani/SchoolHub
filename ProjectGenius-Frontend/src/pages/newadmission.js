import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment-timezone";
import { faHistory, faPhone, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { TiTick } from "react-icons/ti";


//import actions
import { registerStudent } from '../actions/userAction';

// import lib
import toastAlert from '../lib/toast';

const initialFormValue = {
  'firstName': '',
  'lastName': '',
  'fathername': '',
  'mothername': '',
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
  'admissiongrade': '',
  'previousgrade': '',
  'previousschoolhistory': '',
  'emergencyrelationname': '',
  'emergencycontactNumber': '',
  'contactNumber': '',
  'vaccination': '',
  'whatsappNumber': '',
  'signature': '',
  'photo': ''
}

const NewAdmission = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const steps = ["PersonalDetails", "Contact", "History"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const {
    firstName,
    lastName,
    dob,
    age,
    email,
    fathername,
    mothername,
    fatherphonenumber,
    motherphonenumber,
    placeofbirth,
    permanentaddress,
    temporaryaddress,
    bloodgroup,
    vaccination,
    contactNumber,
    whatsappNumber,
    emergencycontactNumber,
    emergencyrelationname,
    previousgrade,
    signature,
    photo,
    previousschoolhistory,
    aadhaarNumber,
    admissiongrade
  } = formValue;


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      // Calculate age based on the selected date of birth
      const birthdate = moment(value, "YYYY-MM-DD");
      const today = moment();
      const age = today.diff(birthdate, "years");
      setFormValue({ ...formValue, age, [name]: value });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  }
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValue({ ...formValue, ... { [name]: files[0] } })
  }

  const handleNextClick = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1);
    }
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('fathername', fathername)
      formData.append('mothername', mothername)
      formData.append('dob', dob)
      formData.append('age', age)
      formData.append('email', email)
      formData.append('placeofbirth', placeofbirth)
      formData.append('permanentaddress', permanentaddress)
      formData.append('temporaryaddress', temporaryaddress)
      formData.append('bloodgroup', bloodgroup)
      formData.append('vaccination', vaccination)
      formData.append('contactNumber', contactNumber)
      formData.append('fatherphonenumber', fatherphonenumber)
      formData.append('motherphonenumber', motherphonenumber)
      formData.append('whatsappNumber', whatsappNumber)
      formData.append('emergencycontactNumber', emergencycontactNumber)
      formData.append('emergencyrelationname', emergencyrelationname)
      formData.append('previousgrade', previousgrade)
      formData.append('signature', signature)
      formData.append('photo', photo)
      formData.append('previousschoolhistory', previousschoolhistory)
      formData.append('aadhaarNumber', aadhaarNumber)
      formData.append('admissiongrade', admissiongrade);

      let { status, message, errors } = await registerStudent(formData)
      if (status === true) {
        toastAlert('success', message)
        setFormValue(initialFormValue)
        setErrors({});
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
        return (
          // Personal Details form JSX
          <div className="person-details">
            <div className="person-header">
              <ion-icon name="person" />
              <span><FontAwesomeIcon icon={faUser} className="personicon" />Person Details</span>
            </div>
            <form className='myform' action="">
              <div className="form-left">
                <div className="field-box">
                  <label htmlFor="">
                    First Name<sup>*</sup>
                  </label>
                  <input type="text" name="firstName" value={firstName} onChange={handleChange} />
                  <span className='text-error'>{errors.firstName}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Date of Birth<sup>*</sup>
                  </label>
                  <input type="date" name="dob" value={dob} onChange={handleChange} />
                  <span className='text-error'>{errors.dob}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Father Name<sup>*</sup>
                  </label>
                  <input type="text" name="fathername" value={fathername} onChange={handleChange} />
                  <span className='text-error'>{errors.fathername}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Place of Birth<sup>*</sup>
                  </label>
                  <input type="text" name="placeofbirth" value={placeofbirth} onChange={handleChange} />
                  <span className='text-error'>{errors.placeofbirth}</span>
                </div>
              </div>
              <div className="form-right">
                <div className="field-box">
                  <label htmlFor="">
                    Last Name<sup>*</sup>
                  </label>
                  <input type="text" name="lastName" value={lastName} onChange={handleChange} />
                  <span className='text-error'>{errors.lastName}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Age<sup>*</sup>
                  </label>
                  <input type="text" name="age" value={age} onChange={handleChange} />
                  <span className='text-error'>{errors.age}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Mother Name<sup>*</sup>
                  </label>
                  <input
                    type="text" name="mothername" value={mothername} onChange={handleChange} />
                  <span className='text-error'>{errors.mothername}</span>
                </div>
                <div className="field-box">
                  <label>
                    Upload Student Photo<sup>*</sup>
                  </label>
                  <input type="file" id="file" name="photo" onChange={handleFileChange} />
                  <label htmlFor="file" className="photo">
                    <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUpload} /></div>
                    {photo ? (<span>{photo.name}</span>) : (<span>Drag and Drop or Browse Files</span>)}
                  </label>
                  {photo && <img src={URL.createObjectURL(photo)} style={{ 'width': '70px', 'marginTop': "5px" }} />}
                  <span className='text-error'>{errors.photo}</span>
                </div>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          // Contact Details form JSX
          <div className="person-details" style={{ minHeight: 420 }}>

            <div className="person-header">

              <span><FontAwesomeIcon icon={faPhone} className="personicon" />Contact Details</span>
            </div>
            <form action="">

              <div className="form-left">

                <div className="field-box">

                  <label htmlFor="">
                    Mobile Number<sup>*</sup>
                  </label>
                  <input type="text" name="contactNumber" value={contactNumber} onChange={handleChange} />
                  <span className='text-error'>{errors.contactNumber}</span>
                </div>
                <div className="field-box">

                  <label htmlFor="">
                    Email Address<sup>*</sup>
                  </label>
                  <input type="email" name="email" value={email} onChange={handleChange} placeholder="abcd123@example.com" />
                  <span className='text-error'>{errors.email}</span>
                </div>
                <div className="field-box">

                  <label htmlFor="">
                    Father's Mobile Number<sup>*</sup>
                  </label>
                  <input type="text" name="fatherphonenumber" value={fatherphonenumber} onChange={handleChange} />
                  <span className='text-error'>{errors.fatherphonenumber}</span>
                </div>
                <div className="field-box">

                  <label htmlFor="">
                    Permanent Address
                    <span className="proof">(As per Government Proof)</span>
                    <sup>*</sup>
                  </label>
                  <textarea name="permanentaddress" value={permanentaddress} onChange={handleChange} />
                  <span className='text-error'>{errors.permanentaddress}</span>
                </div>
              </div>
              <div className="form-right">

                <div className="field-box">
                  <label htmlFor="">
                    WhatsApp Number<sup>*</sup>
                  </label>
                  <input type="text" name="whatsappNumber" value={whatsappNumber} onChange={handleChange} defaultValue="" />
                  <span className='text-error'>{errors.whatsappNumber}</span>
                </div>
                <div className="field-box">

                  <label htmlFor="">
                    Aadhar Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="aadhaarNumber" value={aadhaarNumber} onChange={handleChange}
                    placeholder="xxxx - xxxx - xxxx - xxxx"
                  />
                  <span className='text-error'>{errors.aadhaarNumber}</span>
                </div>
                <div className="field-box">

                  <label htmlFor="">
                    Mother's Mobile Number<sup>*</sup>
                  </label>
                  <input type="text" name="motherphonenumber" value={motherphonenumber} onChange={handleChange} defaultValue="" />
                  <span className='text-error'>{errors.motherphonenumber}</span>
                </div>
                <div className="field-box">

                  <label>
                    Temporary Address<sup>*</sup>
                  </label>
                  <textarea name="temporaryaddress" value={temporaryaddress} onChange={handleChange} />
                  <span className='text-error'>{errors.temporaryaddress}</span>
                </div>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          // Student History form JSX
          <div className="person-details">
            <div className="person-header">
              <span><FontAwesomeIcon icon={faHistory} className='personicon' />Student History</span>
            </div>
            <form action="">
              <div className="form-left">
                <div className="field-box">
                  <label htmlFor="">
                    Admission Grade<sup>*</sup>
                  </label>
                  <select name="admissiongrade" value={admissiongrade} onChange={handleChange}>
                    <option />
                    <option>Preschool</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                  <span className='text-error'>{errors.admissiongrade}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Previous Grade/Class<sup>*</sup>
                  </label>
                  <input type="text" name="previousgrade" value={previousgrade} onChange={handleChange} />
                  <span className='text-error'>{errors.previousgrade}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Previous School Name<sup>*</sup>
                  </label>
                  <input type="text" name="previousschoolhistory" value={previousschoolhistory} onChange={handleChange} />
                  <span className='text-error'>{errors.previousschoolhistory}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Emergency Relation Name<sup>*</sup>
                  </label>
                  <input type="text" name="emergencyrelationname" value={emergencyrelationname} onChange={handleChange} />
                  <span className='text-error'>{errors.emergencyrelationname}</span>
                </div>
              </div>
              <div className="form-right">
                <div className="field-box">
                  <label htmlFor="">
                    Blood Group<sup>*</sup>
                  </label>
                  <select name="bloodgroup" value={bloodgroup} onChange={handleChange}>
                    <option />
                    <option>A+ve</option>
                    <option>A-ve</option>
                    <option>B+ve</option>
                    <option>B-ve</option>
                    <option>AB+ve</option>
                    <option>AB-ve</option>
                    <option>O+ve</option>
                    <option>O-ve</option>
                    <option>A1B+</option>
                    <option>A1B-</option>
                    <option>A2B+</option>
                    <option>A2B-</option>
                    <option>Bombay Blood Group</option>
                  </select>
                  <span className='text-error'>{errors.bloodgroup}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Vaccination Details<sup>*</sup>
                  </label>
                  <input type="text" name="vaccination" value={vaccination} onChange={handleChange} />
                  <span className='text-error'>{errors.vaccination}</span>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Emergency Contact Number<sup>*</sup>
                  </label>
                  <input type="text" name="emergencycontactNumber" value={emergencycontactNumber} onChange={handleChange} />
                  <span className='text-error'>{errors.emergencycontactNumber}</span>
                </div>
                <div className="field-box">
                  <label>
                    Digital Signature<sup>*</sup>
                  </label>
                  <input type="file" id="file" name="signature" onChange={handleFileChange} />
                  <label htmlFor="file" className="photo">
                    <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUpload} /></div>
                    {signature ? (<span>{signature.name}</span>) : <span>Drag and Drop or Browse Files</span>}
                  </label>
                  {signature && <img src={URL.createObjectURL(signature)} style={{ 'width': '70px', 'marginTop': "5px" }} />}
                  <span className='text-error'>{errors.signature}</span>
                </div>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="container-one">
      <Sidebar />
      <div className="right-content">
        <Navbar />
        <div className="stepper-class">
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
                } `}
            >
              <div className="step">
                {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
              </div>
              <p className="text-gray-500">{step}</p>
            </div>
          ))}
        </div>
        {renderForm()}
         <div className="btnn">
        {currentForm < 3 && (
          <button
            onClick={() => {
              handleNextClick();
              if (currentStep === steps.length) {
                setComplete(true);
              } else {
                setCurrentStep((prev) => prev + 1);
              }
            }}
          >
            Next
            <img src="images/arrow.png" alt="" />
          </button>
        )}
        </div>
        <div className="sub-btnn">
        {currentForm === 3 && (
            <button type="button" onClick={() => {
              handleSubmit();
              if (currentStep === steps.length) {
                setComplete(true);
              }
            }}>
              Submit
            </button>
        )}
        </div>
      </div>
    </div>

  )
}

export default NewAdmission;