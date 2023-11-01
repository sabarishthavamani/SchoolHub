import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPhone} from '@fortawesome/free-solid-svg-icons';

const TeacherContact = (props) => {
    const {formValue, setFormValue, handlePreClick, handleNextClick, errors} = props 

    const triggerPreviousForm = () => {
        handlePreClick()
    }

    const triggerNextForm = () => {
        handleNextClick()
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
      }

    const {phoneNumber, email, fatherphonenumber, permanentaddress, whatsappNumber, aadhaarNumber, motherphonenumber, temporaryaddress} = formValue
    const isButtonDisable = (phoneNumber !== "" && email !== "" && fatherphonenumber !== "" && permanentaddress !== "" && whatsappNumber !== "" && aadhaarNumber !== "" && motherphonenumber !== "" && temporaryaddress !== "");

    return (
        <>
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
      <div className="btnn">
      <button 
          className='previous'
          onClick={triggerPreviousForm}
      >
          <FontAwesomeIcon icon={faArrowLeft} className='myarrow' />
          Previous
      </button>
      <button
          onClick={triggerNextForm}
          disabled={!isButtonDisable}
          style={{ backgroundColor: isButtonDisable ? '#ff80a6' : 'gray' }}
        >
          Next
          <img src="images/arrow.png" alt="" />
        </button>
      </div>
      </>
    )}
    
    export default TeacherContact;