import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleDot, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

const FormProgressBar = (props) => {
  const {formValue} = props

  const {firstName, dob, fathername, placeofbirth, lastName, age, mothername, photo, contactNumber, email, fatherphonenumber, permanentaddress, whatsappNumber, aadhaarNumber, motherphonenumber, temporaryaddress, admissiongrade, previousgrade, previousschoolhistory, emergencyrelationname, bloodgroup, vaccination, emergencycontactNumber, signature} = formValue
  const formValeOne = (firstName !== "" && lastName !== "" && dob !== "" && age !== "" && fathername !== "" && mothername !== "" && placeofbirth !== "" && photo !== "");
  const formValueTwo = (contactNumber !== "" && email !== "" && fatherphonenumber !== "" && permanentaddress !== "" && whatsappNumber !== "" && aadhaarNumber !== "" && motherphonenumber !== "" && temporaryaddress !== "");
  const formValueThree = ( admissiongrade !== "" &&  previousgrade !== "" && previousschoolhistory !== "" && emergencyrelationname !== "" && bloodgroup !== "" && vaccination !== "" && emergencycontactNumber !== "" && signature !== "");

  const progressStatus = () => {
    if (formValeOne && formValueTwo) {
      return {width : '100%'}
    } else if (formValeOne) {
      return {width : '50%'}
    } else {
      return {width : '0%'}
    }
    
    
  }

  return (
    <div className="progress-bar-container">
    <div className="progress-bar-completion" style={progressStatus()}></div>
      <div className="step">
      <span>{formValeOne ? <FontAwesomeIcon icon={faCircleCheck} style={{color: "#00C271", transition: "all 0.3s ease 0s"}} /> : <FontAwesomeIcon icon={faCircleDot} style={{color: "#ff80a6", transition: "all 0.3s ease 0s"}} />}</span>
      </div>
      <div className="step">
      <span>{formValeOne && formValueTwo ? <FontAwesomeIcon icon={faCircleCheck} style={{color: "#00C271", transition: "all 0.3s ease 0s"}} /> : <FontAwesomeIcon icon={faCircleDot} style={{color: "#ff80a6", transition: "all 0.3s ease 0s"}} />}</span>
      </div>
      <div className="step">
      <span>{formValeOne && formValueTwo && formValueThree ? <FontAwesomeIcon icon={faCircleCheck} style={{color: "#00C271", transition: "all 0.3s ease 0s"}} /> : <FontAwesomeIcon icon={faCircleDot} style={{color: "#ff80a6", transition: "all 0.3s ease 0s" }} />}</span>
      </div>
    </div>
  );
};

export default FormProgressBar;
