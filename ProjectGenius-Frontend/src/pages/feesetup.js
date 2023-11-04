import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

//lib
import toastAlert from '../lib/toast';

//actions
import { feeSetup } from '../actions/userAction';


const initialFormValue = {
  grade: '',
  term1: '',
  term2: '',
  term3: '',

}

const FeeSetup = () => {
  // hooks
  const navigate = useNavigate();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);

  const { grade, term1, term2, term3 } = formValue;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, ...{ [name]: value } })
  }
  const handleSubmit = async () => {
    try {

      let data = {
        grade: grade,
        term1: term1,
        term2: term2,
        term3: term3,
      }
      let { status, message } = await feeSetup(data)
      if (status === true) {
        setFormValue(initialFormValue)
        toastAlert('success', message)
      } else if (status === false) {
        if (message) {
          toastAlert('error', message)
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
          <form action="" className="setup-form">
            <div className="setup-content">
              <div className="setup-left">
                <div className="setup-box">
                  <label htmlFor="">
                    Grade<sup>*</sup>
                  </label>
                  <select name="grade" value={grade} onChange={handleChange}>
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
                </div>
              </div>
              <div className="setup-right">
                <div className="setup-box">
                  <label>Fee Amount - Term 1</label>
                  <input type="text" value={term1} name='term1' onChange={handleChange} />
                </div>
                <div className="setup-box">
                  <label>Fee Amount - Term 2</label>
                  <input type="text" value={term2} name='term2' onChange={handleChange} />
                </div>
                <div className="setup-box">
                  <label>Fee Amount - Term 3</label>
                  <input type="text" value={term3} name='term3' onChange={handleChange} />
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