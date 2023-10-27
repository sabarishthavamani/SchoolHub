import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import moment from "moment-timezone";

const AdmissionFormOne = (props) => {
    const {formValue, setFormValue, handleNextClick, errors} = props

    const triggerNextForm = () => {
      handleNextClick()
    }

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
        setFormValue({ ...formValue, ...{ [name]: files[0] } })
      }

    const {firstName, dob, fathername, placeofbirth, lastName, age, mothername, photo} = formValue

    const isButtonDisable = (firstName !== "" && lastName !== "" && dob !== "" && age !== "" && fathername !== "" && mothername !== "" && placeofbirth !== "" && photo !== "");

    return (
        // Personal Details form JSX
        <>
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
                {errors.firstName !== "" &&<span className='text-error'>{errors.firstName}</span>}
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Date of Birth<sup>*</sup>
                </label>
                <input type="date" name="dob" value={dob} onChange={handleChange} />
                {/* <span className='text-error'>{errors.dob}</span> */}
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Father Name<sup>*</sup>
                </label>
                <input type="text" name="fathername" value={fathername} onChange={handleChange} />
                {/* <span className='text-error'>{errors.fathername}</span> */}
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Place of Birth<sup>*</sup>
                </label>
                <input type="text" name="placeofbirth" value={placeofbirth} onChange={handleChange} />
                {/* <span className='text-error'>{errors.placeofbirth}</span> */}
              </div>
            </div>
            <div className="form-right">
              <div className="field-box">
                <label htmlFor="">
                  Last Name<sup>*</sup>
                </label>
                <input type="text" name="lastName" value={lastName} onChange={handleChange} />
                {/* <span className='text-error'>{errors.lastName}</span> */}
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Age<sup>*</sup>
                </label>
                <input type="text" name="age" value={age} onChange={handleChange} />
                {/* <span className='text-error'>{errors.age}</span> */}
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Mother Name<sup>*</sup>
                </label>
                <input
                  type="text" name="mothername" value={mothername} onChange={handleChange} />
                {/* <span className='text-error'>{errors.mothername}</span> */}
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
                {/* <span className='text-error'>{errors.photo}</span> */}
              </div>
            </div>
          </form>
        </div>
        <div className="btnn">
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

export default AdmissionFormOne