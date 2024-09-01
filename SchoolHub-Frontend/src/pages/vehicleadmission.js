import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import VehicleFormOne from "./components/vehicleformone";
import VehicleFormTwo from "./components/vehicleformtwo";
import VehicleFormThree from "./components/vehicleformthree";

//import action
import { VehicleDetailsURL, VehicleURL } from "../actions/adminAction";
//import lib
import toastAlert from "../lib/toast";
import { useNavigate } from "react-router-dom";

const initialFormValue = {
'vehicleRegisterNumber': "",
'vehicleType': "",
'manufacturer': "",
'seatingCapacity': "",
'status': "",
'ownerName': "",
'registrationDate': "",
'mileage': "",
'pollutionCertificate': "",
'pollutionTestedDate': "",
'pollutionValidityDate': "",
'insurance': "",
'insuranceStartDate': "",
'insuranceEndDate': "",
'isSpeedGovernorInstalled': "",
'speedLimit': "",
'fitnessCertificateNumber': "",
'fitnessTestedDate': "",
'accidentClaimsInfo': "",
'serviceHistoryDetails': "",
'usageType': "",
'vehicleRoute': '',

};

const VehicleAdmission = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);

  const{
    vehicleRegisterNumber,
    vehicleType,
    manufacturer,
    seatingCapacity,
    status,
    ownerName,
    registrationDate,
    mileage,
    pollutionCertificate,
    pollutionTestedDate,
    pollutionValidityDate,
    insurance,
    insuranceStartDate,
    insuranceEndDate,
    isSpeedGovernorInstalled,
    speedLimit,
    fitnessCertificateNumber,
    fitnessTestedDate,
    accidentClaimsInfo,
    serviceHistoryDetails,
    usageType,
    vehicleRoute,
  }=formValue;

  const navigate = useNavigate();

  const handlePreClick = () => {
    setCurrentForm(currentForm - 1);
  };

  const handleNextClick = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1);
    }
  };

  const handleSubmit = async () => {
   try{
    let formData = new FormData();
    formData.append('vehicleType',vehicleType)
    formData.append('vehicleRegisterNumber',vehicleRegisterNumber)
    formData.append('manufacturer',manufacturer)
    formData.append('seatingCapacity',seatingCapacity)
    formData.append('status',status)
    formData.append('ownerName',ownerName)
    formData.append('registrationDate',registrationDate)
    formData.append('mileage',mileage)
    formData.append('pollutionCertificate',pollutionCertificate)
    formData.append('pollutionTestedDate',pollutionTestedDate)
    formData.append('pollutionValidityDate',pollutionValidityDate)
    formData.append('insurance',insurance)
    formData.append('insuranceStartDate',insuranceStartDate)
    formData.append('insuranceEndDate',insuranceEndDate)
    formData.append('isSpeedGovernorInstalled',isSpeedGovernorInstalled)
    formData.append('speedLimit',speedLimit)
    formData.append('fitnessCertificateNumber',fitnessCertificateNumber)
    formData.append('fitnessTestedDate',fitnessTestedDate)
    formData.append('accidentClaimsInfo',accidentClaimsInfo)
    formData.append('serviceHistoryDetails',serviceHistoryDetails)
    formData.append('usageType',usageType)
    formData.append('vehicleRoute',vehicleRoute);
    
    let {  message, errors,status:addstatus } = await VehicleURL(formData)
    toastAlert(addstatus, message)
    setFormValue(initialFormValue)
    navigate('/vehicleview')

} catch (err) {
   console.log(err)
}
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
      {/* <Sidebar />
      <div className="teacher-content">
        <Navbar pageTitle="New Bus" /> */}
        {renderForm()}
      {/* </div> */}
    </div>
  );
};

export default VehicleAdmission;
