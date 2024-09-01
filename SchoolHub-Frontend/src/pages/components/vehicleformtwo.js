import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";

const VehicleFormTwo = ({
  handlePreClick,
  handleNextClick,
  setFormValue,
  formValue,
}) => {
  const {
    pollutionCertificate,
    pollutionTestedDate,
    pollutionValidityDate,
    insurance,
    insuranceStartDate,
    insuranceEndDate,
    isSpeedGovernorInstalled,
    speedLimit,
  } = formValue;

  const [fileErrorMsg, setFileErrorMsg] = useState("");

  const isButtonDisable =
    pollutionCertificate !== "" &&
    pollutionTestedDate !== "" &&
    pollutionValidityDate !== "" &&
    insurance !== "" &&
    insuranceStartDate !== "" &&
    insuranceEndDate !== "" &&
    isSpeedGovernorInstalled !== "" &&
    speedLimit !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const supportedExtension = [
      ".jpg",
      ".png",
      ".jpeg",
      ".gif",
      ".pdf",
      ".doc",
    ];
    const selectedFile = files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name
        .substring(selectedFile.name.lastIndexOf("."))
        .toLowerCase();

      if (!supportedExtension.includes(fileExtension)) {
        setFileErrorMsg(
          "Please upload a valid signature file (jpg, jpeg, png, gif, pdf, doc)."
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

  const triggerPreviousForm = () => {
    handlePreClick();
  };

  const displayFile = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("image/")) {
        return (
          <img
            src={url}
            style={{ width: "70px", marginTop: "5px" }}
            alt="Uploaded File"
          />
        );
      } else if (file.type === "application/pdf") {
        return (
          <embed
            src={url}
            type="application/pdf"
            width="70px"
            height="70px"
            style={{ marginTop: "5px" }}
          />
        );
      }
    }
    return null;
  };

  return (
    <>
      <div className="attendance">
        <AdminHeader />
        <div className="attendance-content">
          <AdminSidebar />
          <div className="att-sheet">
          <h2 className="dashboard-title">Vehicle Details</h2>

            <div
              className="class-details"
              style={{ width: "85%", borderRadius: "15px" }}
            >
              <form action="" className="teacher-form">
                <div className="teach-box">
                  <label htmlFor="PollutionTestedDate">
                    Pollution Tested Date<sup>*</sup>
                  </label>
                  <div className="date-input-container">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={pollutionTestedDate}
                      placeholder="DD/MM/YYYY"
                      readOnly
                    />
                    <input
                      type="date"
                      name="pollutionTestedDate"
                      onChange={handleChange}
                      id="PollutionTestedDate"
                    />
                  </div>
                </div>
                <div className="teach-box">
                  <label htmlFor="PollutionValidityDate">
                    Pollution Validity Date<sup>*</sup>
                  </label>
                  <div className="date-input-container ">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={pollutionValidityDate}
                      placeholder="DD/MM/YYYY"
                      readOnly
                    />
                    <input
                      type="date"
                      name="pollutionValidityDate"
                      onChange={handleChange}
                      id="PollutionValidityDate"
                    />
                  </div>
                </div>
                <div className="teach-box">
                  <label htmlFor="InsuranceStartDate">
                    Insurance Start Date<sup>*</sup>
                  </label>
                  <div className="date-input-container ">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={insuranceStartDate}
                      placeholder="DD/MM/YYYY"
                      readOnly
                    />
                    <input
                      type="date"
                      name="insuranceStartDate"
                      onChange={handleChange}
                      id="InsuranceStartDate"
                    />
                  </div>
                </div>
                <div className="teach-box">
                  <label htmlFor="InsuranceEndDate">
                    Insurance End Date<sup>*</sup>
                  </label>
                  <div className="date-input-container ">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={insuranceEndDate}
                      placeholder="DD/MM/YYYY"
                      readOnly
                    />
                    <input
                      type="date"
                      name="insuranceEndDate"
                      onChange={handleChange}
                      id="InsuranceEndDate"
                    />
                  </div>
                </div>
                <div className="teach-box">
                  <label htmlFor="IsSpeedGovernorInstalled">
                    Speed Governor Installed<sup>*</sup>
                  </label>
                  <select
                    id="IsSpeedGovernorInstalled"
                    name="isSpeedGovernorInstalled"
                    value={isSpeedGovernorInstalled}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="true">Installed</option>
                    <option value="false">Not Installed</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="SpeedLimit">Speed Limit</label>
                  <input
                    type="number"
                    id="SpeedLimit"
                    value={speedLimit}
                    onChange={handleChange}
                    name="speedLimit"
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="PollutionCertificate">
                    Pollution Certificate<sup>*</sup>
                  </label>
                  <input
                    type="file"
                    name="pollutionCertificate"
                    id="PollutionCertificate"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                  />
                  <label htmlFor="PollutionCertificate" className="t-photo">
                    <div style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faUpload} />
                    </div>
                    {pollutionCertificate ? (
                      <span>{pollutionCertificate.name}</span>
                    ) : (
                      <span>Drag and Drop or Browse Files</span>
                    )}
                  </label>
                  {displayFile(pollutionCertificate)}
                  <span className="text-error">{fileErrorMsg}</span>
                  {pollutionCertificate === "" && fileErrorMsg === "" && (
                    <span className="text-error">*No file uploaded</span>
                  )}
                </div>
                <div className="teach-box">
                  <label htmlFor="Insurance">
                    Insurance<sup>*</sup>
                  </label>
                  <input
                    type="file"
                    name="insurance"
                    id="Insurance"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                  />
                  <label htmlFor="Insurance" className="t-photo">
                    <div style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faUpload} />
                    </div>
                    {insurance ? (
                      <span>{insurance.name}</span>
                    ) : (
                      <span>Drag and Drop or Browse Files</span>
                    )}
                  </label>
                  {displayFile(insurance)}
                  <span className="text-error">{fileErrorMsg}</span>
                  {insurance === "" && fileErrorMsg === "" && (
                    <span className="text-error">*No file uploaded</span>
                  )}
                </div>
              </form>
            </div>

            <div className="sub-btnn">
              <div className="sub-btnn button">
                <button className="previous" onClick={triggerPreviousForm}>
                  <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
                  Previous
                </button>
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

export default VehicleFormTwo;
