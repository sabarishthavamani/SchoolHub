import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment-timezone";
import { faArrowRight, faHistory, faPhone, faUpload, faUser ,faArrowLeft } from '@fortawesome/free-solid-svg-icons';

//import actions
import { getSingleteacher, updateTeacher } from '../actions/userAction';

// import lib
import toastAlert from '../lib/toast';

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

const TeacherEdit = () => {
    const [currentForm, setCurrentForm] = useState(1);
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { Id } = useParams();
    const [data, setData] = useState([]);
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
            setCurrentForm(currentForm + 1)
        }
    };
const  handlePreClick=()=>{
    setCurrentForm(currentForm - 1)
}
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
            formData.append('currentsalary', currentsalary)
            formData.append('Id', Id);

            let { status, message, errors } = await updateTeacher(formData)
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
    const displayFile = (file) => {
        if (typeof file === 'object') {
            const url = URL.createObjectURL(file);
            if (file.type.startsWith("image/")) {
                return <img src={url} style={{ width: "70px" }} alt="Uploaded File" />;
            } else if (file.type === "application/pdf") {
                return <embed src={url} type="application/pdf" width="70px" height="70px" />;
            }
        } else if (typeof file === 'string') {
            // If it's a string (URL), simply use it
            if (file.startsWith("data:") || file.startsWith("http")) {
                if (file.startsWith("data:")) {
                    // If it's a data URL, display an image
                    return <img src={file} style={{ width: "70px" }} alt="Uploaded File" />;
                } else if (file.endsWith(".pdf")) {
                    // If it's a PDF URL, display a PDF viewer
                    return <embed src={file} type="application/pdf" width="70px" height="70px" />;
                }
            } else {
                return null;
            }
        }
        return null;
    };

    const getData = async (id) => {
        try {
            let { status, result } = await getSingleteacher(id)
            if (status === true) {
                setFormValue(result)
                setData(result)
            } else if (status === false) {
                // navigate('/students')
            }
        } catch (err) {
            console.log(err, '--err')
        }
    }
    useEffect(() => {
        getData(Id)
    }, [])
    const renderForm = () => {
        switch (currentForm) {
            case 1:
                return (
                    // Personal Details form JSX
                    <div className="teacher-details">
                    <div className="teacher-header">
                      <ion-icon name="person" />
                      <span>Personal Details</span>
                    </div>
                    <form action="" className="teacher-form">
                      <div className="form-left">
                        <div className="teach-box">
                          <label htmlFor="">
                            First Name<sup>*</sup>
                          </label>
                          <input type="text" name="firstName" value={firstName} onChange={handleChange} />
                          {errors.firstName !== "" && <span className='text-error'>{errors.firstName}</span>}
                        </div>
                        <div className="teach-box">
                          <label htmlFor="">
                            Date of Birth<sup>*</sup>
                          </label>
                          <input type="date" name="dob" value={dob} onChange={handleChange} />
                          {errors.dob !== "" && <span className='text-error'>{errors.dob}</span>}
                        </div>
                        <div className="teach-box">
                          <label htmlFor="">
                            Marital Status<sup>*</sup>
                          </label>
                          <select name="maritalstatus" value={maritalstatus} onChange={handleChange}>
                            <option />
                            <option>Married</option>
                            <option>Single</option>
                            <option>Widowed</option>
                            <option>Divorced</option>
                          </select>
                          {errors.maritalstatus !== "" && <span className='text-error'>{errors.maritalstatus}</span>}
                        </div>
                        <div className="teach-box">
                          <label htmlFor="">
                            Place of Birth<sup>*</sup>
                          </label>
                          <input type="text" name="placeofbirth" value={placeofbirth} onChange={handleChange} />
                          {errors.placeofbirth !== "" && <span className='text-error'>{errors.placeofbirth}</span>}
                        </div>
                      </div>
                      <div className="form-right">
                        <div className="teach-box">
                          <label htmlFor="">
                            Last Name<sup>*</sup>
                          </label>
                          <input type="text" name="lastName" value={lastName} onChange={handleChange} />
                          {errors.lastName !== "" && <span className='text-error'>{errors.lastName}</span>}
                        </div>
                        <div className="teach-box">
                          <label htmlFor="">
                            Age<sup>*</sup>
                          </label>
                          <input type="text" name="age" value={age} onChange={handleChange} />
                          {errors.age !== "" && <span className='text-error'>{errors.age}</span>}
                        </div>
                        <div className="teach-box">
                          <label htmlFor="">
                            Current Salary<sup>*</sup>
                          </label>
                          <input type="text" name="currentsalary" value={currentsalary} onChange={handleChange} />
                          {errors.currentsalary !== "" && <span className='text-error'>{errors.currentsalary}</span>}
                        </div>
                        <div className="teach-box">
                          <label>
                            Upload Teacher Photo<sup>*</sup>
                          </label>
                          <input type="file" id="file" name="teacherphoto" onChange={handleFileChange} />
                          <label htmlFor="file" className="t-photo">
                            <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUpload} /></div>
                            {typeof teacherphoto === 'string' ? (
                                            <span>Drag and Drop or Browse Files</span>
                                        ) : (
                                            <span>{teacherphoto.name}</span>
                                        )}
                                    </label>
                                    {typeof teacherphoto === 'object' && <img src={URL.createObjectURL(teacherphoto)} style={{ 'width': '60px' }} />}
                                    {typeof teacherphoto === 'string' && <img src={teacherphoto} style={{ 'width': '60px','marginTop': "5px" }} />}
                          {errors.teacherphoto !== "" && <span className='text-error'>{errors.teacherphoto}</span>}
                        </div>
                      </div>
                    </form>
                  </div>
                );
            case 2:
                return (
                    // Contact Details form JSX
                    <div className="teacher-details" style={{ minHeight: 420 }}>
                    <div className="teacher-header">
                        <ion-icon name="person" />
                        <span>Contact Details</span>
                    </div>
                    <form action="" className="teacher-form">
                        <div className="form-left">
                            <div className="teach-box">
                                <label htmlFor="">
                                    Mobile Number<sup>*</sup>
                                </label>
                                <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange}  />
                          { errors.phoneNumber !== "" && <span className='text-error'>{errors.phoneNumber}</span> }
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Email Address<sup>*</sup>
                                </label>
                                <input type="email" name="email" value={email} onChange={handleChange} placeholder="abcd123@example.com" />
                           { errors.email !== "" && <span className='text-error'>{errors.email}</span>}
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Father's Mobile Number<sup>*</sup>
                                </label>
                                <input type="text" name="fatherphonenumber" value={fatherphonenumber} onChange={handleChange} />
                          { errors.fatherphonenumber !== "" && <span className='text-error'>{errors.fatherphonenumber}</span> }
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Permanent Address
                                    <span className="proof">(As per Government Proof)</span>
                                    <sup>*</sup>
                                </label>
                                <textarea name="permanentaddress" value={permanentaddress} onChange={handleChange} />
                          {errors.permanentaddress !== "" &&  <span className='text-error'>{errors.permanentaddress}</span> }
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="teach-box">
                                <label htmlFor="">
                                    WhatsApp Number<sup>*</sup>
                                </label>
                                <input type="text" name="whatsappNumber" value={whatsappNumber} onChange={handleChange} />
                          {errors.whatsappNumber !== "" && <span className='text-error'>{errors.whatsappNumber}</span> }
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Aadhar Number<sup>*</sup>
                                </label>
                                <input
                            type="text"
                            name="aadhaarNumber" value={aadhaarNumber} onChange={handleChange}
                            placeholder="xxxx - xxxx - xxxx - xxxx"
                          />
                          {errors.aadhaarNumber !== "" && <span className='text-error'>{errors.aadhaarNumber}</span>}
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Mother's Mobile Number<sup>*</sup>
                                </label>
                                <input type="text" name="motherphonenumber" value={motherphonenumber} onChange={handleChange} />
                          { errors.motherphonenumber !== "" && <span className='text-error'>{errors.motherphonenumber}</span> }
                            </div>
                            <div className="teach-box">
                                <label>
                                    Temporary Address<sup>*</sup>
                                </label>
                                <textarea name="temporaryaddress" value={temporaryaddress} onChange={handleChange} />
                          { errors.motherphonenumber !== "" &&  <span className='text-error'>{errors.temporaryaddress}</span> }
                            </div>
                        </div>
                    </form>
                </div>
                );
            case 3:
                return (
                    // Student History form JSX
                    <div className="teacher-details" style={{ minHeight: 420 }}>
                    <div className="teacher-header">
                        <ion-icon name="person" />
                        <span>Teacher History</span>
                    </div>
                    <form action="" className="teacher-form">
                        <div className="form-left">
                            <div className="teach-box">
                                <label htmlFor="">
                                    Educational Qualifications(Highest Degree)<sup>*</sup>
                                </label>
                                <select name="higherqualification" value={higherqualification} onChange={handleChange}>
                                    <option />
                                    <option>High School Diploma</option>
                                    <option>Associate's Degree</option>
                                    <option>Bachelor's Degree</option>
                                    <option>Bachelor's Degree in Education</option>
                                    <option>Master's Degree</option>
                                    <option>Master's Degree in Education</option>
                                    <option>Doctorate (Ph.D.) in Education</option>
                                    <option>Teaching Certificate</option>
                                    <option>Postgraduate Certificate in Education</option>
                                    <option>Other</option>
                                </select>
                                {errors.higherqualification !== "" && <span className='text-error'>{errors.higherqualification}</span>}
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Previous Teaching Experience (in Years)<sup>*</sup>
                                </label>
                                <input type="text" name="teachingexperience" value={teachingexperience} onChange={handleChange} />
                                {errors.teachingexperience !== "" && <span className='text-error'>{errors.teachingexperience}</span>}
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Subject(s) Taught<sup>*</sup>
                                </label>
                                <input type="text" name="subjects" value={subjects} onChange={handleChange} />
                                {errors.subjects !== "" && <span className='text-error'>{errors.subjects}</span>}
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Teaching Certifications(if any)<sup>*</sup>
                                </label>
                                <input type="text" name="teachingcertificates" value={teachingcertificates} onChange={handleChange} />
                                {errors.teachingcertificates !== "" && <span className='text-error'>{errors.teachingcertificates}</span>}
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="teach-box">
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
                                {errors.bloodgroup !== "" && <span className='text-error'>{errors.bloodgroup}</span>}
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Vaccination Details<sup>*</sup>
                                </label>
                                <input type="text" name="vaccination" value={vaccination} onChange={handleChange} />
                                {errors.vaccination !== "" && <span className='text-error'>{errors.vaccination}</span>}
                            </div>
                            <div className="teach-box">
                                <label htmlFor="">
                                    Emergency Contact Number<sup>*</sup>
                                </label>
                                <input type="text" name="emergencycontactNumber" value={emergencycontactNumber} onChange={handleChange} />
                                {errors.emergencycontactNumber !== "" && <span className='text-error'>{errors.emergencycontactNumber}</span>}
                            </div>
                            <div className="teach-box">
                                <label>
                                    Digital Signature<sup>*</sup>
                                </label>
                                <input type="file" id="file" name="teachersignature" onChange={handleFileChange} accept="image/*,application/pdf" />
                                <label htmlFor="file" className="t-photo">
                                    <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUpload} /></div>
                                    {typeof teachersignature === 'string' ? (
                                         <span>Drag and Drop or Browse Files</span>
                                       ):(
                                        <span>{teachersignature.name}</span>
                                       )
                                       }
                                    </label>
                                    {displayFile(teachersignature)}
                                {errors.teachersignature !== "" && <span className='text-error'>{errors.teachersignature}</span>}
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
       <>
       <h3 className="editname">Edit Teacher: {data.name}</h3>
        <div className="container-one container-edit">
            <div className="right-content">
                {renderForm()}
                <div className="btnn">
                {currentForm == 2 && (
                        <button className='previous'
                            onClick={() => {
                                handlePreClick();
                            }}
                        ><FontAwesomeIcon icon={faArrowLeft} className='myarrow' />Previous
                        </button>
                    )}
                    {currentForm < 3 && (
                        <button
                            onClick={() => {
                                handleNextClick();
                            }}
                        >Next<FontAwesomeIcon icon={faArrowRight} className='myarrow' />
                        </button>
                    )}
                </div>
                <div className="sub-btnn">
                {currentForm == 3 && (
                        <button
                            onClick={() => {
                                handlePreClick();
                            }}
                        ><FontAwesomeIcon icon={faArrowLeft} className='myarrow' />Previous
                        </button>
                    )}
                    {currentForm === 3 && (
                        <button type="button" onClick={() => {
                            handleSubmit();
                        }}
                        >Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
        </>

    )
}

export default TeacherEdit;