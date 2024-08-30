import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
//import actions
import {
  feeCollection,
  viewFees,
  getSinglestudent,
} from "../actions/adminAction";
//import lib
import toastAlert from "../lib/toast";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const initialFormValue = {
  name: "",
  studentId: "",
  dueamount: "",
  paymentterm: [],
  admissiongrade: "",
  feeSetupData: [],
};
const options = [
  { label: "Term 1", value: "term1" },
  { label: "Term 2", value: "term2" },
  { label: "Term 3", value: "term3" },
];

const FeeCollection = () => {
  // hooks
  const navigate = useNavigate();
  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  //params
  const { Id } = useParams();

  const {
    name,
    studentId,
    dueamount,
    paymentterm,
    admissiongrade,
    feeSetupData,
  } = formValue;

  const fetchFeeSetupData = async () => {
    try {
      let { status, result } = await viewFees(); // Call the updated feeSetup API
      if (status === true && Array.isArray(result)) {
        // Check if result is an array
        console.log(result, "---result");
        setFormValue({ ...formValue, feeSetupData: result });
      } else {
        // Handle the case where result is not an array
        toastAlert("error", "Failed to fetch fee setup data");
      }
    } catch (error) {
      console.log(error);
      toastAlert("error", "Failed to fetch fee setup data");
    }
  };

  useEffect(() => {
    // Fetch fee setup data from the API and store it in state
    fetchFeeSetupData();
  }, []);

  const handleSelectChange = (selectedOptions) => {
    // Extract the values from selectedOptions
    const selectedValues = selectedOptions.map((option) => option.value);
    // Find the object that matches the selected grade
    const selectedGradeData = feeSetupData.find(
      (gradeData) => gradeData.admissiongrade === admissiongrade
    );
    if (selectedGradeData) {
      // Calculate the dueamount based on the selected terms and the selected grade's data
      let totalDueAmount = 0;
      selectedValues.forEach((term) => {
        if (selectedGradeData[term]) {
          totalDueAmount += selectedGradeData[term];
        }
      });
      // Update the state with selected terms and calculated due amount
      setFormValue({
        ...formValue,
        paymentterm: selectedValues,
        dueamount: totalDueAmount,
      });
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        paymentterm: undefined,
      }));
    } else {
      // If no matching grade data is found, set an error for 'paymentterm'
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        paymentterm: "Invalid admission grade selected",
      }));
    }
  };

  const CustomOption = ({ children, innerProps, isSelected, isDisabled }) => (
    <div {...innerProps} className={isSelected ? "option selected" : "option"}>
      <input type="checkbox" checked={isSelected} onChange={() => {}} />
      <span className="checkmark">{isSelected && "✔"}</span>
      {children}
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear the error for this input
    }));
    setFormValue({ ...formValue, ...{ [name]: value } });
  };

  const getData = async (id) => {
    try {
      let { status, result } = await getSinglestudent(id);
      if (status === true) {
        setFormValue((prevFormValue) => ({ ...prevFormValue, ...result }));
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  useEffect(() => {
    getData(Id);
  }, []);
  // console.log(data, '---data')
  const handleSubmit = async () => {
    try {
      let data = {
        name: name,
        studentId: studentId,
        dueamount: dueamount,
        paymentterm: paymentterm,
        admissiongrade: admissiongrade,
      };
      let { status, message, errors, result } = await feeCollection(data);
      if (status === true) {
        setFormValue(initialFormValue);
        toastAlert("success", message);
        setErrors({});
        navigate(`/feepayment/${name}`, { state: { data: result } });
      }
      if (status === false) {
        if (errors) {
          setErrors(errors);
          // Update the inputErrors state for each input with an error
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            name: errors.name,
            studentId: errors.studentId,
            admissiongrade: errors.admissiongrade,
            paymentterm: errors.paymentterm,
          }));
        }
        if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {
      console.log(err, "...err");
    }
  };

  return (
    <>
      <div className="attendance">
        <AdminHeader />
        <div className="attendance-content">
          <AdminSidebar />
          <div className="att-sheet">
            <h2 className="dashboard-title">Student Fee Collection</h2>

            <div
              className="class-details"
              style={{ width: "85%", borderRadius: "15px" }}
            >
              <form className="myform" action="" style={{ marginTop: "35px" }}>
                <div className="teach-box">
                  <label>Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={studentId}
                    onChange={handleChange}
                    style={{ height: "48px" }}
                  />
                  <span className="text-error">{inputErrors.studentId}</span>
                </div>

                <div className="teach-box">
                  <label>
                    Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    style={{ height: "48px" }}
                  />
                  <span className="text-error">{inputErrors.name}</span>
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Grade<sup>*</sup>
                  </label>
                  <select
                    name="admissiongrade"
                    value={admissiongrade}
                    onChange={handleChange}
                    style={{ height: "48px" }}
                  >
                    <option>Select Grade</option>
                    <option>Preschool</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                  <span className="text-error">
                    {inputErrors.admissiongrade}
                  </span>
                </div>
                <div className="teach-box">
                  <label>Payment Term</label>
                  <div>
                    <Select
                      options={options}
                      value={options.filter((option) =>
                        paymentterm.includes(option.value)
                      )}
                      onChange={handleSelectChange}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      components={{
                        Option: CustomOption,
                      }}
                    />
                  </div>
                  <span className="text-error">{inputErrors.paymentterm}</span>
                </div>
                <div className="teach-box">
                  <label>Due Amount</label>
                  <input
                    type="text"
                    name="dueamount"
                    value={dueamount}
                    onChange={handleChange}
                    style={{ height: "48px" }}
                  />
                </div>
              </form>
            </div>

            <div className="sub-btnn">
              <div className="sub-btnn button">
                <button type="button" onClick={handleSubmit}>
                  Process to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeeCollection;
