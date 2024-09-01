import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import LeaveApproval from "../leaveApproval";
import { leaveDisplay, leaveformDislay } from "../../actions/adminAction";
import AlertConfirm, { Button } from "react-alert-confirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import TeacherHeader from "../components/teachernavbar";
import TeacherSidebar from "../components/teachersidebar";
import { Dailyattendance, findsection } from "../../actions/teacherAction";
import toastAlert from "../../lib/toast";
import EmployeeleaveEdit from "../employeeleaveEdit";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";

const AdminBoard = (props) => {
  const {
    formValue = {}, // Default value to an empty object
    setFormValue,
    handleNextClick,
    errors,
  } = props;

  // Destructuring of formValue with default values
  const {
    firstName = "",
    dob = "",
    fathername = "",
    placeofbirth = "",
    lastName = "",
    age = "",
    mothername = "",
    photo = null,
    vehicleRegisterNumber = "",
    vehicleRoute = "",
  } = formValue;

  // Ensure next button disable
  const isButtonDisable =
    firstName !== "" &&
    lastName !== "" &&
    dob !== "" &&
    age !== "" &&
    fathername !== "" &&
    mothername !== "" &&
    placeofbirth !== "";

  // Other input validating state
  const [onFocusFirstName, setFocusOnFirstName] = useState(false);
  const [onFocusLastName, setFocusOnLastName] = useState(false);
  const [onFocusFather, setFocusOnFather] = useState(false);
  const [onFocusMother, setFocusOnMother] = useState(false);
  // Photo validating state
  const [fileErrorMsg, setFileErrorMsg] = useState("");

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const supportedExtension = [".jpg", ".png", ".jpeg", ".gif"];
    const selectedFile = files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name
        .substring(selectedFile.name.lastIndexOf("."))
        .toLowerCase();
      if (!supportedExtension.includes(fileExtension)) {
        setFileErrorMsg(
          "Please upload a valid image file (jpg, jpeg, png, gif)."
        );
        setFormValue({ ...formValue, ...{ [name]: "" } });
      } else if (selectedFile.size > 300000 || selectedFile.size < 30000) {
        setFileErrorMsg("File size should be Minimum 30Kb to Maximum 300Kb");
        setFormValue({ ...formValue, ...{ [name]: "" } });
      } else {
        setFileErrorMsg("");
        setFormValue({ ...formValue, ...{ [name]: selectedFile } });
      }
    }
  };

  const triggerNextForm = () => {
    handleNextClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const dateValue = new Date(value);
      const day = dateValue.getDate().toString().padStart(2, "0");
      const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
      const year = dateValue.getFullYear();
      const dateOfBirth = `${day}/${month}/${year}`;
      const birthDate = moment(dateOfBirth, "DD/MM/YYYY");
      const today = moment();
      const age = today.diff(birthDate, "years");
      setFormValue({ ...formValue, age, [name]: dateOfBirth });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  return (
    <>
      <div className="attendance">
        <AdminHeader />
        <div className="attendance-content">
          <AdminSidebar />
          <div className="att-sheet">
            <h2 className="dashboard-title">New Student</h2>

            <div
              className="class-details"
              style={{ width: "85%", borderRadius: "15px" }}
            >
              <form className="myform" action="" style={{ marginTop: "35px" }}>
                <div className="field-box">
                  <label htmlFor="">
                    First Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    maxLength={15}
                    onFocus={() => setFocusOnFirstName(true)}
                    onBlur={() => setFocusOnFirstName(false)}
                  />
                  {onFocusFirstName && firstName.length >= 15 && (
                    <span className="text-error">
                      Reached max characters limit 15
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Last Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    maxLength={15}
                    onFocus={() => setFocusOnLastName(true)}
                    onBlur={() => setFocusOnLastName(false)}
                  />
                  {onFocusLastName && lastName.length >= 15 && (
                    <span className="text-error">
                      Reached max characters limit 15
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Date of Birth<sup>*</sup>
                  </label>
                  <div className="date-input-container ">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={dob}
                      placeholder="DD/MM/YYYY"
                      readOnly
                    />
                    <input type="date" name="dob" onChange={handleChange} />
                  </div>
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Age<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={age}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Father Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="fathername"
                    value={fathername}
                    onChange={handleChange}
                    maxLength={20}
                    onFocus={() => setFocusOnFather(true)}
                    onBlur={() => setFocusOnFather(false)}
                  />
                  {onFocusFather && fathername.length >= 20 && (
                    <span className="text-error">
                      Reached max characters limit 20
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Mother Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="mothername"
                    value={mothername}
                    onChange={handleChange}
                    maxLength={20}
                    onFocus={() => setFocusOnMother(true)}
                    onBlur={() => setFocusOnMother(false)}
                  />
                  {onFocusMother && mothername.length >= 20 && (
                    <span className="text-error">
                      Reached max characters limit 20
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Place of Birth<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="placeofbirth"
                    value={placeofbirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-box">
                  <label>Upload Student Photo</label>
                  <input
                    type="file"
                    id="file"
                    name="photo"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file" className="photo">
                    <div style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faUpload} />
                    </div>
                    {photo ? (
                      <span>{photo.name}</span>
                    ) : (
                      <span>Drag and Drop or Browse Files</span>
                    )}
                  </label>
                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      style={{ width: "70px", marginTop: "5px" }}
                    />
                  )}
                  <span className="text-error">{fileErrorMsg}</span>
                  {photo === "" && fileErrorMsg === "" && (
                    <span className="text-error">*No file uploaded</span>
                  )}
                </div>
              </form>
            </div>

            <div className="sub-btnn">
              <div className="sub-btnn button">
                <button
                  onClick={triggerNextForm}
                  disabled={!isButtonDisable}
                  style={{
                    backgroundColor: isButtonDisable ? "#ff80a6" : "gray",
                  }}
                >
                  Next
                  <img src="images/arrow.png" alt="" />
                </button>
              </div>
              <div className="sub-btnn button">
                <button
                  onClick={triggerNextForm}
                  disabled={!isButtonDisable}
                  style={{
                    backgroundColor: isButtonDisable ? "#ff80a6" : "gray",
                  }}
                >
                  Next
                  <img src="images/arrow.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBoard;
