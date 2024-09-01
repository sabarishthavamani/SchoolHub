import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";

const DriverSalary = ({
  formValue,
  setFormValue,
  handleSubmit,
  handlePreClick,
}) => {
  const [onFocusSalary, setFocusOnSalary] = useState(false);

  const {
    currentsalary,
    dearnessallowance,
    medicalallowance,
    dearnessallowanceAmount,
    medicalallowanceAmount,
    hraAllowanceAmount,
    grossSalary = "0",
    hraAllowance,
  } = formValue;

  const isButtonDisable =
    currentsalary !== "" &&
    dearnessallowance !== "" &&
    hraAllowance !== "" &&
    medicalallowance !== "";
  const triggerPreviousForm = () => {
    handlePreClick();
  };

  const triggerSubmitAction = () => {
    handleSubmit();
  };
  useEffect(() => {
    const total = (
      parseInt(formValue.currentsalary || 0) +
      parseInt(formValue.dearnessallowanceAmount || 0) +
      parseInt(formValue.medicalallowanceAmount || 0) +
      parseInt(formValue.hraAllowanceAmount || 0)
    ).toString();
    setFormValue({ ...formValue, grossSalary: total });
  }, [
    formValue.currentsalary,
    formValue.dearnessallowanceAmount,
    formValue.medicalallowanceAmount,
    formValue.hraAllowanceAmount,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "dearnessallowance" ||
      name === "medicalallowance" ||
      name === "hraAllowance"
    ) {
      const percentage = parseFloat(value);
      const currentSalaryValue = parseFloat(formValue.currentsalary);
      if (!isNaN(percentage) && !isNaN(currentSalaryValue)) {
        const allowanceAmount = (currentSalaryValue * percentage) / 100;
        setFormValue({
          ...formValue,
          [name]: value,
          [`${name}Amount`]: allowanceAmount.toFixed(2),
        });
      } else {
        setFormValue({ ...formValue, [name]: value, [`${name}Amount`]: "" });
      }
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />
        <div className="att-sheet">
          <h2 className="dashboard-title">Basic Salary</h2>

          <div
            className="class-details"
            style={{ width: "85%", borderRadius: "15px" }}
          >
            <form className="myform" action="" style={{ marginTop: "35px" }}>
              <div className="field-box">
                <label htmlFor="">
                  Basic Salary<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="currentsalary"
                  value={currentsalary}
                  onChange={handleChange}
                  maxLength={10}
                  onFocus={() => setFocusOnSalary(true)}
                  onBlur={() => setFocusOnSalary(false)}
                />
                {onFocusSalary && currentsalary.length >= 10 && (
                  <span className="text-error">
                    Reached max characters limit 10
                  </span>
                )}
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Dearness Allowance<sup>*</sup>
                  (in Percentage %)
                </label>
                <input
                  type="text"
                  name="dearnessallowance"
                  placeholder="%"
                  value={formValue.dearnessallowance}
                  onChange={handleChange}
                  maxLength={2}
                />
                <span value={dearnessallowanceAmount}>
                  {formValue.dearnessallowanceAmount !== undefined
                    ? `Amount: ${formValue.dearnessallowanceAmount}`
                    : ""}
                </span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Medical Allowance<sup>*</sup>
                  (in Percentage %)
                </label>
                <input
                  type="text"
                  name="medicalallowance"
                  placeholder="%"
                  value={medicalallowance}
                  onChange={handleChange}
                  maxLength={2}
                />
                <span value={medicalallowanceAmount}>
                  {formValue.medicalallowanceAmount !== undefined
                    ? `Amount: ${formValue.medicalallowanceAmount}`
                    : ""}
                </span>
              </div>

              <div className="field-box">
                <label htmlFor="">
                  HRA<sup>*</sup>
                  (in Percentage %)
                </label>
                <input
                  type="text"
                  name="hraAllowance"
                  placeholder="%"
                  value={formValue.hraAllowance}
                  onChange={handleChange}
                  maxLength={2}
                />
                <span value={hraAllowanceAmount}>
                  {formValue.hraAllowanceAmount !== undefined
                    ? `Amount: ${formValue.hraAllowanceAmount}`
                    : ""}
                </span>
              </div>

              <div className="field-box">
                <label htmlFor="">
                  Gross Salary<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="grossSalary"
                  value={formValue.grossSalary}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </form>
          </div>
          <div className="sub-btnn">
            <div className="sub-btnn button">
              <button
                // className='previous'
                onClick={triggerPreviousForm}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
                Previous
              </button>
            </div>
            <div className="sub-btnn button">
              <button
                type="button"
                onClick={triggerSubmitAction}
                disabled={!isButtonDisable}
                style={{
                  backgroundColor: isButtonDisable ? "#ff80a6" : "gray",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSalary;
