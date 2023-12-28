import React, { useState, useRef, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

// import lib
import toastAlert from '../lib/toast';

// import actions
import { verify, Reverify } from '../actions/adminAction';

const Verify = () => {

  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || '';
  //states
  const [errors, setErrors] = useState({});
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [inputErrors,setInputErrors] = useState({});

  const handleChange = (e, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;
    setOtpValues(newOtpValues);
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      verificationCode: null, // Clear the error for this input
  }));
    if (e.target.value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    } else if (index === 5) {
      // If the last field, update the value without moving focus
      newOtpValues[index] = e.target.value.slice(0, 1);
      setOtpValues(newOtpValues);
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && index === 5 && otpValues[index] === '') {
      // If backspace is pressed in the last field and it's empty, clear all fields
      setOtpValues(['', '', '', '', '', '']);
      // Move focus back to the first field
      inputRefs[0].current.focus();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      handleBackspace(e, 5); // Check for backspace keypress in the last field
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [otpValues]);

  const handleResend = async () => {
    try {
      let { status, message } = await Reverify();

      if (status === true) {
        toastAlert('success', message);
      } else if (status === false) {
        if (message) {
          toastAlert('error', message);
        }
      }
    } catch (err) {

    }
  }

  const handleSubmit = async () => {
    try {
      let data = {
        verificationCode: otpValues.join(''),
      };
      let { status, message, errors } = await verify(data);

      if (status === true) {
        toastAlert('success', message);
        setOtpValues(['', '', '', '', '', '']);
        setErrors({});
        navigate('/newadmission');
      } else if (status === false) {
        if (errors) {
          setErrors(errors);
          setInputErrors((prevErrors)=>({
            ...prevErrors,
            verificationCode:errors.verificationCode
          }))
        }

        if (message) {
          toastAlert('error', message);
        }
      }
    } catch (err) { }
  };


  return (
    <div className="container2">
      <div className="left-content-2">
        <img id="ellipse-2" src="images/Ellipse 17.svg" />
        <img id="ell-2" src="images/Ellipse 17.png" />
        <img className="kids2" src="images/Kids Studying from Home-pana 1.svg" />
      </div>
      <div className="right-content-2">
        <div className="otp-box">
          <div className="otp">
            <h2>OTP Verification</h2>
            <p>Enter the OTP sent to {userEmail}</p>
            <div className="otp-input">
              {otpValues.map((value, index) => (
               <input
               key={index}
               type="text"
               value={value}
               onChange={(e) => handleChange(e, index)}
               onKeyUp={(e) => handleBackspace(e, index)}
               ref={inputRefs[index]}
             />
              ))}
            </div>
            <div className="validation-message">
              <span className="error-message">{inputErrors && inputErrors.verificationCode}</span>
            </div>
            <p>
              If you didn't receive a code,{" "}
              <button className="resend-otp" type="button" onClick={handleResend}> Resend OTP</button>
            </p>
            <button className="verify" type="button" onClick={handleSubmit}>Verify</button>
          </div>
        </div>
      </div>
    </div>


  )
}
export default Verify;


