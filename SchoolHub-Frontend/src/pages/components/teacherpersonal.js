import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";

const TeacherPersonal = (props) => {
  const { formValue, setFormValue, handleNextClick } = props;

  const [onFocusFirstName, setFocusOnFirstName] = useState(false);
  const [onFocusLastName, setFocusOnLastName] = useState(false);
  const [onFocusSalary, setFocusOnSalary] = useState(false);
  const [fileErrorMsg, setFileErrorMsg] = useState("");

  const triggerNextForm = () => {
    handleNextClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      const dateValue = new Date(value)
      const day = dateValue.getDate().toString().padStart(2, '0');
      const month = (dateValue.getMonth() + 1).toString().padStart(2, '0');
      const year = dateValue.getFullYear();
      const dateOfBirth = `${day}/${month}/${year}`;

      const birthDate = moment(dateOfBirth, "DD/MM/YYYY");
      const today = moment();
      const age = today.diff(birthDate, "years");

      setFormValue({ ...formValue, age, [name]: dateOfBirth });
    } else {
      setFormValue({ ...formValue, [name]: value });
      console.log(formValue);
    }
  }

  useEffect(() => {
    const total =
      (
        parseInt(formValue.currentsalary || 0) +
        parseInt(formValue.dearnessallowanceAmount || 0) +
        parseInt(formValue.medicalallowanceAmount || 0) +
        parseInt(formValue.hraAllowanceAmount || 0)
      ).toString();
    setFormValue({ ...formValue, grossSalary: total });
  }, [formValue.currentsalary, formValue.dearnessallowanceAmount, formValue.medicalallowanceAmount, formValue.hraAllowanceAmount]);
  


  const handleFileChange = (e) => {
    const { name, files } = e.target;
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
        setFormValue({ ...formValue, [name]: null });
      } else if (selectedFile.size > 300000 || selectedFile.size < 30000) {
        setFileErrorMsg("File size should be Minimum 30Kb to Maximum 300Kb");
        setFormValue({ ...formValue, [name]: null });
      } else {
        setFileErrorMsg("");
        setFormValue({ ...formValue, [name]: selectedFile });
      }
    }
  };

  const {
    firstName,
    dob,
    maritalstatus,
    placeofbirth,
    lastName,
    age,
    teacherphoto,
  } = formValue;



  const isButtonDisable =
    firstName !== "" &&
    lastName !== "" &&
    dob !== "" &&
    age !== "" &&
    maritalstatus !== "" &&
    placeofbirth !== "" &&
    teacherphoto !== ""


  return (
    <>
      <div className="attendance">
        <AdminHeader />
        <div className="attendance-content">
          <AdminSidebar />
          <div className="att-sheet">
            <h2 className="dashboard-title">New Teacher</h2>

            <div
              className="class-details"
              style={{ width: "85%", borderRadius: "15px" }}
            >
               <form action="" className="teacher-form" >
          <div className="teach-box">
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
          <div className="teach-box">
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
          <div className="teach-box">
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
          <div className="teach-box">
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
          <div className="teach-box">
            <label htmlFor="">
              Marital Status<sup>*</sup>
            </label>
            <select
              name="maritalstatus"
              value={maritalstatus}
              onChange={handleChange}
            >
              <option />
              <option>Married</option>
              <option>Single</option>
              <option>Widowed</option>
              <option>Divorced</option>
            </select>
          </div>

          <div className="teach-box">
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
          <div className="teach-box">
            <label>Upload Teacher Photo</label>
            <input
              type="file"
              id="file"
              name="teacherphoto"
              onChange={handleFileChange}
            />
            <label htmlFor="file" className="t-photo">
              <div style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faUpload} />
              </div>
              {teacherphoto ? (
                <span>{teacherphoto.name}</span>
              ) : (
                <span>Drag and Drop or Browse Files</span>
              )}
            </label>
            {teacherphoto && (
              <img
                src={URL.createObjectURL(teacherphoto)}
                style={{ width: "70px", marginTop: "5px" }}
              />
            )}
            <span className="text-error">{fileErrorMsg}</span>
            {teacherphoto === "" && fileErrorMsg === "" && (
              <span className="text-error">*No file uploaded</span>
            )}
          </div>
        </form>
            </div>

            <div className="btnn">
        <button
          onClick={triggerNextForm}
          disabled={!isButtonDisable}
          style={{ backgroundColor: isButtonDisable ? "#ff80a6" : "gray" }}
        >
          Next
          <img src="images/arrow.png" alt="" />
        </button>
      </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherPersonal;
