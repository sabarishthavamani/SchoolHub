import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const VehicleFormThree = ({
  handlePreClick,
  setFormValue,
  formValue,
}) => {
  const {
    fitnessCertificateNumber,
    fitnessTestedDate,
    accidentClaimsInfo,
    serviceHistoryDetails,
    usageType,
    vehicleRoute
  } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const triggerSubmitAction = () => {
    console.log(formValue, "final");
  };

  const triggerPreviousForm = () => {
    handlePreClick();
  };

  const isButtonDisable =
    fitnessCertificateNumber !== "" &&
    fitnessTestedDate !== "" &&
    accidentClaimsInfo !== "" &&
    serviceHistoryDetails !== "" &&
    usageType !== "" &&
    vehicleRoute !== "";

  return (
    <>
      <div className="teacher-details">
        <div className="teacher-header">
          <ion-icon name="person" />
          <span>Vehicle Details</span>
        </div>
        <form action="" className="teacher-form">
          <div className="teach-box">
            <label htmlFor="FitnessCertificateNumber">
              F.C Number<sup>*</sup>
            </label>
            <input
              type="number"
              name="fitnessCertificateNumber"
              id="FitnessCertificateNumber"
              value={fitnessCertificateNumber}
              onChange={handleChange}
            />
          </div>
          <div className="teach-box">
            <label htmlFor="FitnessTestedDate">
              Fitness Tested Date<sup>*</sup>
            </label>
            <div className="date-input-container ">
              <input
                type="text"
                style={{ borderRadius: "4px 0px 0px 4px " }}
                value={fitnessTestedDate}
                placeholder="DD/MM/YYYY"
                readOnly
              />
              <input
                type="date"
                name="fitnessTestedDate"
                onChange={handleChange}
                id="FitnessTestedDate"
              />
            </div>
          </div>
          <div className="teach-box">
            <label htmlFor="UsageType">
              Vehicle Usage Type<sup>*</sup>
            </label>
            <select
              id="UsageType"
              name="usageType"
              value={usageType}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="live">Live</option>
              <option value="spare">Spare</option>
            </select>
          </div>
          <div className="teach-box">
            <label htmlFor="AccidentClaimsInfo">
              Accident Claims Info<sup>*</sup>
            </label>
            <input
              type="text"
              name="accidentClaimsInfo"
              id="AccidentClaimsInfo"
              value={accidentClaimsInfo}
              onChange={handleChange}
            />
          </div>
          <div className="teach-box">
            <label htmlFor="ServiceHistoryDetails">
              Service History Details<sup>*</sup>
            </label>
            <input
              type="text"
              name="serviceHistoryDetails"
              id="ServiceHistoryDetails"
              value={serviceHistoryDetails}
              onChange={handleChange}
            />
          </div>
          <div className="teach-box">
            <label htmlFor="VehicleRoute">
            Vehicle Route<sup>*</sup>
            </label>
            <input
              type="text"
              name="vehicleRoute"
              id="VehicleRoute"
              value={vehicleRoute}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="btnn">
        <button className="previous" onClick={triggerPreviousForm}>
          <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
          Previous
        </button>
        <button
          type="button"
          onClick={triggerSubmitAction}
          disabled={!isButtonDisable}
          style={{ backgroundColor: isButtonDisable ? "#ff80a6" : "gray" }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default VehicleFormThree;
