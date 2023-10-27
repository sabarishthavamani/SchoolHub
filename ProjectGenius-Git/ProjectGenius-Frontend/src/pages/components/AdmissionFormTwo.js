import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPhone} from '@fortawesome/free-solid-svg-icons';

const AdmissionFormTwo = (props) => {
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

    const {contactNumber, email, fatherphonenumber, permanentaddress, whatsappNumber, aadhaarNumber, motherphonenumber, temporaryaddress} = formValue
    const isButtonDisable = (contactNumber !== "" && email !== "" && fatherphonenumber !== "" && permanentaddress !== "" && whatsappNumber !== "" && aadhaarNumber !== "" && motherphonenumber !== "" && temporaryaddress !== "");

    return (
        // Contact Details form JSX
        <>
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
              {/* <span className='text-error'>{errors.contactNumber}</span> */}
            </div>
            <div className="field-box">

              <label htmlFor="">
                Email Address<sup>*</sup>
              </label>
              <input type="email" name="email" value={email} onChange={handleChange} placeholder="abcd123@example.com" />
               { errors.email !== "" && <span className='text-error'>{errors.email}</span>}
            </div>
            <div className="field-box">

              <label htmlFor="">
                Father's Mobile Number<sup>*</sup>
              </label>
              <input type="text" name="fatherphonenumber" value={fatherphonenumber} onChange={handleChange} />
              {/* <span className='text-error'>{errors.fatherphonenumber}</span> */}
            </div>
            <div className="field-box">

              <label htmlFor="">
                Permanent Address
                <span className="proof">(As per Government Proof)</span>
                <sup>*</sup>
              </label>
              <textarea name="permanentaddress" value={permanentaddress} onChange={handleChange} />
              {/* <span className='text-error'>{errors.permanentaddress}</span> */}
            </div>
          </div>
          <div className="form-right">

            <div className="field-box">
              <label htmlFor="">
                WhatsApp Number<sup>*</sup>
              </label>
              <input type="text" name="whatsappNumber" value={whatsappNumber} onChange={handleChange} />
              {/* <span className='text-error'>{errors.whatsappNumber}</span> */}
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
              {errors.aadhaarNumber !== "" &&<span className='text-error'>{errors.aadhaarNumber}</span>}
            </div>
            <div className="field-box">

              <label htmlFor="">
                Mother's Mobile Number<sup>*</sup>
              </label>
              <input type="text" name="motherphonenumber" value={motherphonenumber} onChange={handleChange} />
              {/* <span className='text-error'>{errors.motherphonenumber}</span> */}
            </div>
            <div className="field-box">

              <label>
                Temporary Address<sup>*</sup>
              </label>
              <textarea name="temporaryaddress" value={temporaryaddress} onChange={handleChange} />
              {/* <span className='text-error'>{errors.temporaryaddress}</span> */}
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
    );
}

export default AdmissionFormTwo