import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import VehicleFormOne from "./components/vehicleformone";
import VehicleFormTwo from "./components/vehicleformtwo";
import VehicleFormThree from "./components/vehicleformthree";

const initialFormValue = {
  vehicleNumber: "",
  vehicleRegisterNumber: "",
  manufacturer: "",
  seatingCapacity: "",
  status: "",
  ownerName: "",
  registrationDate: "",
  mileage: "",
  pollutionCertificate: "",
  pollutionTestedDate: "",
  pollutionValidityDate: "",
  insurance: "",
  insuranceStartDate: "",
  insuranceEndDate: "",
  isSpeedGovernorInstalled: "",
  speedLimit: "",
  fitnessCertificateNumber: "",
  fitnessTestedDate: "",
  accidentClaimsInfo: "",
  serviceHistoryDetails: "",
  usageType: "",
  vehicleRoute: '',
};

const VehicleAdmission = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);

  const handlePreClick = () => {
    setCurrentForm(currentForm - 1);
  };

  const handleNextClick = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1);
    }
  };

  const handleSubmit = () => {
    //Backend connection should done here
    console.log(formValue, 'final')
  }

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          <VehicleFormOne
            formValue={formValue}
            setFormValue={setFormValue}
            handleNextClick={handleNextClick}
          />
        );
      case 2:
        return (
          <VehicleFormTwo
            formValue={formValue}
            setFormValue={setFormValue}
            handlePreClick={handlePreClick}
            handleNextClick={handleNextClick}
          />
        );
      case 3:
        return (
          <VehicleFormThree
            formValue={formValue}
            setFormValue={setFormValue}
            handlePreClick={handlePreClick}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="teacher">
      <Sidebar />
      <div className="teacher-content">
        <Navbar pageTitle="New Bus" />
        {renderForm()}
      </div>
    </div>
  );
};

export default VehicleAdmission;
