import React, { useState } from 'react'
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHistory, faPhone, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';

const Teacher = () => {
    const [currentForm, setCurrentForm] = useState(1);

    const handleNextClick = () => {
        if (currentForm < 3) {
            setCurrentForm(currentForm + 1)
        }
    };
    const handlePreClick = () => {
        setCurrentForm(currentForm - 1)
    };

    const renderForm = () => {
        switch (currentForm) {
            case 1:
                return (
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
                              <input type="text" name="" defaultValue="" />
                            </div>
                            <div className="teach-box">
                              <label htmlFor="">
                                Date of Birth<sup>*</sup>
                              </label>
                              <input type="date" name="" defaultValue="" />
                            </div>
                            <div className="teach-box">
                              <label htmlFor="">
                                Years of Experience<sup>*</sup>
                              </label>
                              <input type="text" name="" defaultValue="" />
                            </div>
                            <div className="teach-box">
                              <label htmlFor="">
                                Place of Birth<sup>*</sup>
                              </label>
                              <input type="text" name="" defaultValue="" />
                            </div>
                          </div>
                          <div className="form-right">
                            <div className="teach-box">
                              <label htmlFor="">
                                Last Name<sup>*</sup>
                              </label>
                              <input type="text" name="" defaultValue="" />
                            </div>
                            <div className="teach-box">
                              <label htmlFor="">
                                Age<sup>*</sup>
                              </label>
                              <input type="text" name="" defaultValue="" />
                            </div>
                            <div className="teach-box">
                              <label htmlFor="">
                                Current Salary<sup>*</sup>
                              </label>
                              <input type="text" name="" defaultValue="" />
                            </div>
                            <div className="teach-box">
                              <label>
                                Upload Teacher Photo<sup>*</sup>
                              </label>
                              <input type="file" id="file" />
                              <label htmlFor="file" className="t-photo">
                                <i className="fa fa-upload" />
                                Drag and Drop<span> or Browse Files</span>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>  

                );
            case 2:
                return (
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
                                            <input type="text" name="" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Email Address<sup>*</sup>
                                            </label>
                                            <input type="email" name="" placeholder="abcd123@example.com" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Father's Mobile Number<sup>*</sup>
                                            </label>
                                            <input type="text" name="" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Permanent Address
                                                <span className="proof">(As per Government Proof)</span>
                                                <sup>*</sup>
                                            </label>
                                            <textarea defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="form-right">
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                WhatsApp Number<sup>*</sup>
                                            </label>
                                            <input type="text" name="" defaultValue="" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Aadhar Number<sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                name=""
                                                placeholder="xxxx - xxxx - xxxx - xxxx"
                                            />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Mother's Mobile Number<sup>*</sup>
                                            </label>
                                            <input type="text" name="" defaultValue="" />
                                        </div>
                                        <div className="teach-box">
                                            <label>
                                                Temporary Address<sup>*</sup>
                                            </label>
                                            <textarea defaultValue={""} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                );
            case 3:
                return (
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
                                            <input type="text" name="" id="" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Previous Teaching Experience (in Years)<sup>*</sup>
                                            </label>
                                            <input type="text" name="" defaultValue="" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Subject(s) Taught<sup>*</sup>
                                            </label>
                                            <input type="text" name="" defaultValue="" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Teaching Certifications(if any)<sup>*</sup>
                                            </label>
                                            <input type="text" name="" defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="form-right">
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Blood Group<sup>*</sup>
                                            </label>
                                            <select name="" id="">
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
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Vaccination Details<sup>*</sup>
                                            </label>
                                            <input type="text" name="" defaultValue="" />
                                        </div>
                                        <div className="teach-box">
                                            <label htmlFor="">
                                                Emergency Contact Number<sup>*</sup>
                                            </label>
                                            <input type="text" name="" defaultValue="" />
                                        </div>
                                        <div className="teach-box">
                                            <label>
                                                Digital Signature<sup>*</sup>
                                            </label>
                                            <input type="file" id="file" />
                                            <label htmlFor="file" className="t-photo">
                                                <i className="fa fa-upload" />
                                                Drag and Drop<span> or Browse Files</span>
                                            </label>
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
        <div className="teacher">
            <Sidebar />
            <div className="teacher-content">
              <Navbar pageTitle="New Teacher"/>
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
            >
              Next
              <img src="images/arrow.png" alt="" />
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
            //   handleSubmit();
            }}
            >
              Submit
            </button>
          )}
        </div>
            </div>
        </div>

    )
}
export default Teacher;