import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
//import actions
import { driverAadhar, getAllVehicle } from "../../actions/adminAction";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";

const DriverContact = (props) => {
  const [data, setData] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [onFocusPhoneNum, setFocusOnPhoneNum] = useState(false);
  const [onFocusWhatsApp, setFocusOnWhatsApp] = useState(false);
  const [onFocusEmail, setFocusOnEmail] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [onFocusPerAdd, setFocusOnPerAdd] = useState(false);
  const [onFocusTempAdd, setFocusOnTempAdd] = useState(false);
  const [onFocusAadhar, setFocusOnAadhar] = useState(false);

  const { formValue, setFormValue, handlePreClick, handleNextClick } = props;
  const {
    phoneNumber,
    email,
    permanentaddress,
    whatsappNumber,
    aadhaarNumber,
    temporaryaddress,
  } = formValue;
  const isButtonDisable =
    phoneNumber.length === 10 &&
    email !== "" &&
    permanentaddress !== "" &&
    whatsappNumber.length === 10 &&
    aadhaarNumber.length === 14 &&
    temporaryaddress !== "";

  const [VehicleList, setVehicleList] = useState([]);

  const getDataVehicle = async () => {
    try {
      const vehicleDetails = await getAllVehicle();
      const data = vehicleDetails.result;
      setVehicleList(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataVehicle();
  }, []);

  const [SelectedBusRoute, setSelectedBusRoute] = useState({
    vehicleRoute: "",
    vehicleRegisterNumber: "",
  });

  const handlerouteselection = (e) => {
    const selectedNumber = e.target.value;
    const selectedRoute = VehicleList.find(
      (vehicleRoute) => vehicleRoute.vehicleRegisterNumber === selectedNumber
    );

    setSelectedBusRoute({
      vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
      vehicleRegisterNumber: selectedNumber ? selectedNumber : "",
    });

    setFormValue({
      ...formValue,
      vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
      vehicleRegisterNumber: selectedNumber,
    });
  };

  useEffect(() => {
    setSelectedBusRoute({
      vehicleRoute: formValue.vehicleRoute,
      vehicleRegisterNumber: formValue.vehicleRegisterNumber,
    });
  }, [formValue]);
  const triggerPreviousForm = () => {
    handlePreClick();
  };
  const triggerNextForm = () => {
    handleNextClick();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  // validating an Email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setEmailValid(validateEmail(value));
  };

  const getData = async () => {
    let { status, result } = await driverAadhar();
    if (status == true) {
      setData(result);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let isAadharExists = false;

    for (let i = 0; i < data.length; i++) {
      const ans = data[i];
      const ans2 = ans.aadhaarNumber;

      if (ans2 === aadhaarNumber) {
        isAadharExists = true;
        break;
      }
    }

    if (isAadharExists) {
      setAadharError("Aadhar number already exists");
    } else {
      setAadharError("");
    }
  }, [data, aadhaarNumber]);

  return (
    <>
      <div className="attendance">
        <AdminHeader />
        <div className="attendance-content">
          <AdminSidebar />
          <div className="att-sheet">
            <h2 className="dashboard-title">Contact Details</h2>
            <div
              className="class-details"
              style={{ width: "85%", borderRadius: "15px" }}
            >
              <form className="myform" action="" style={{ marginTop: "35px" }}>
                <div className="field-box">
                  <label htmlFor="">
                    Mobile Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    maxLength={10}
                    onBlur={() =>
                      phoneNumber.length < 10
                        ? setFocusOnPhoneNum(true)
                        : setFocusOnPhoneNum(false)
                    }
                  />
                  {phoneNumber.length < 10 && onFocusPhoneNum && (
                    <span className="text-error">
                      Please enter valid 10 digit mobile number
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    WhatsApp Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={whatsappNumber}
                    onChange={handleChange}
                    maxLength={10}
                    onBlur={() =>
                      whatsappNumber.length < 10
                        ? setFocusOnWhatsApp(true)
                        : setFocusOnWhatsApp(false)
                    }
                  />
                  {whatsappNumber.length < 10 && onFocusWhatsApp && (
                    <span className="text-error">
                      Please enter valid 10 digit mobile number
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="abcd123@example.com"
                    onFocus={() => setFocusOnEmail(true)}
                    onBlur={() => setFocusOnEmail(false)}
                  />
                  {!isEmailValid && onFocusEmail && (
                    <span className="text-error">
                      Please enter a valid email address(Ex:abc123@gmail.com)
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Aadhar Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={aadhaarNumber}
                    onChange={handleChange}
                    maxLength={14}
                    onBlur={() =>
                      aadhaarNumber.length < 14
                        ? setFocusOnAadhar(true)
                        : setFocusOnAadhar(false)
                    }
                    placeholder="xxxx - xxxx - xxxx"
                  />
                  {aadhaarNumber.length < 14 && onFocusAadhar && (
                    <span className="text-error">
                      Please enter valid 12 digit aadhaar number in format
                      like(1234-1234-1234)
                    </span>
                  )}
                  {aadharError && (
                    <span className="text-error">{aadharError}</span>
                  )}
                </div>
                <div className="field-box">
                  <label htmlFor="">
                    Permanent Address
                    <span className="proof">(As per Government Proof)</span>
                    <sup>*</sup>
                  </label>
                  <textarea
                    name="permanentaddress"
                    value={permanentaddress}
                    onChange={handleChange}
                    maxLength={50}
                    onFocus={() => setFocusOnPerAdd(true)}
                    onBlur={() => setFocusOnPerAdd(false)}
                  />
                  {permanentaddress.length >= 50 && onFocusPerAdd && (
                    <span className="text-error">
                      Reached max characters limit 50
                    </span>
                  )}
                </div>
                <div className="field-box">
                  <label>
                    Temporary Address<sup>*</sup>
                  </label>
                  <textarea
                    name="temporaryaddress"
                    value={temporaryaddress}
                    onChange={handleChange}
                    maxLength={50}
                    onFocus={() => setFocusOnTempAdd(true)}
                    onBlur={() => setFocusOnTempAdd(false)}
                  />
                  {temporaryaddress.length >= 50 && onFocusTempAdd && (
                    <span className="text-error">
                      Reached max characters limit 50
                    </span>
                  )}
                </div>
                <div>
                  <div className="field-box">
                    {/* <div className="bus-allocation-heading">Bus Allocation</div> */}
                    <label htmlFor="">
                      Bus Stop<sup>*</sup>
                    </label>
                    <select
                      name="vehicleRoute"
                      value={SelectedBusRoute.vehicleRegisterNumber}
                      onChange={handlerouteselection}
                    >
                      <option value=""></option>
                      {VehicleList.map((route) => (
                        <option
                          key={route.vehicleRegisterNumber}
                          value={route.vehicleRegisterNumber}
                        >
                          {route.vehicleRoute}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field-box">
                    <label htmlFor="">
                      Bus Number<sup>*</sup>
                    </label>
                    <input
                      name="vehicleRegisterNumber"
                      value={SelectedBusRoute.vehicleRegisterNumber}
                      onChange={handlerouteselection}
                    />
                  </div>
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

export default DriverContact;
