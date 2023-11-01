import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import moment from "moment-timezone";

const TeacherPersonal = (props) => {
  const { formValue, setFormValue, handleNextClick, errors } = props

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

  const { firstName, dob, maritalstatus, placeofbirth, lastName, age, currentsalary, teacherphoto } = formValue

  const isButtonDisable = (firstName !== "" && lastName !== "" && dob !== "" && age !== "" && maritalstatus !== "" && currentsalary !== "" && placeofbirth !== "" && teacherphoto !== "");
  return (
    <>
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
              <div className='date-input-container '>
                  <input type="text" value={ dob }  readOnly />
                  <input type='date' name='dob' onChange={handleChange} />
                </div>
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
                {teacherphoto ? (<span>{teacherphoto.name}</span>) : (<span>Drag and Drop or Browse Files</span>)}
              </label>
              {teacherphoto && <img src={URL.createObjectURL(teacherphoto)} style={{ 'width': '70px', 'marginTop': "5px" }} />}
              {errors.teacherphoto !== "" && <span className='text-error'>{errors.teacherphoto}</span>}
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
  )
}

export default TeacherPersonal;