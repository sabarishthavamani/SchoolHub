import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

//lib
import toastAlert from '../lib/toast';

//actions
import { feeSetup } from '../actions/adminAction';


const initialFormValue = {
  admissiongrade: '',
  term1: '',
  term2: '',
  term3: '',

}

const FeeSetup = () => {
  // hooks
  const navigate = useNavigate();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors,setErrors] = useState({});
  const [inputErrors,setInputErrors]=useState({});

  const { admissiongrade, term1, term2, term3 } = formValue;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear the error for this input
    }));
    setFormValue({ ...formValue, ...{ [name]: value } })
  }
  const handleSubmit = async (e) => {
    try {

      let data = {
        admissiongrade: admissiongrade,
        term1: term1,
        term2: term2,
        term3: term3,
      }
      let { status, message,errors } = await feeSetup(data)
      if (status === true) {
        setFormValue(initialFormValue)
        toastAlert('success', message)
      } if (status === false) {
        if (errors) {
          setErrors(errors);
          // Update the inputErrors state for each input with an error
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            admissiongrade: errors.admissiongrade, 
            term1 :errors.term1,
            term2:errors.term2,
            term3:errors.term3,
          }));
        }
        if (message) {
          toastAlert('error', message);
        }
      }
    } catch (err) {
      console.log(err, '...err')
    }
  }

  const handleClick = () =>{
    navigate('/feeslist')
  }

  return (
    <div className="fee-collection">
      <Sidebar />
      <div className="fee-content">
        <Navbar pageTitle={'Fee Setup'} />
        <div className="fee-setup">
          <div className="fee-setup-header">
            <span>Student Fee Setup</span>
          </div>
          <form className="setup-form">
            <div className="setup-content">
              <div className="setup-left">
                <div className="setup-box">
                  <label htmlFor="">
                    Grade<sup>*</sup>
                  </label>
                  <select name="admissiongrade" value={admissiongrade} onChange={handleChange}>
                    <option >Select Grade</option>
                    <option >Preschool</option>
                    <option >LKG</option>
                    <option >UKG</option>
                    <option >Class 1</option>
                    <option >Class 2</option>
                    <option >Class 3</option>
                    <option >Class 4</option>
                    <option >Class 5</option>
                    <option >Class 6</option>
                    <option >Class 7</option>
                    <option >Class 8</option>
                    <option >Class 9</option>
                    <option >Class 10</option>
                    <option >Class 11</option>
                    <option >Class 12</option>
                  </select>
                  <span className='text-error'>{inputErrors.admissiongrade}</span>
                </div>
              </div>
              <div className="setup-right">
                <div className="setup-box">
                  <label>Fee Amount - Term 1</label>
                  <input type="text" value={term1} name='term1' onChange={handleChange} />
                  <span className='text-error'>{inputErrors.term1}</span>
                </div>
                <div className="setup-box">
                  <label>Fee Amount - Term 2</label>
                  <input type="text" value={term2} name='term2' onChange={handleChange} />
                  <span className='text-error'>{inputErrors.term2}</span>
                </div>
                <div className="setup-box">
                  <label>Fee Amount - Term 3</label>
                  <input type="text" value={term3} name='term3' onChange={handleChange} />
                  <span className='text-error'>{inputErrors.term3}</span>
                </div>
              </div>
            </div>
            <div className="save-changes">
              <button type="button" onClick={handleSubmit}>Save Changes</button>
            </div>
            <div className="fee-view">
              <button type="button" onClick={handleClick} >View Fees List<FontAwesomeIcon icon={faGreaterThan} style={{marginLeft:'10px', color:'#ff80a6'}} ></FontAwesomeIcon><FontAwesomeIcon icon={faGreaterThan} style={{color:'#ff80a6'}} ></FontAwesomeIcon></button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
export default FeeSetup;