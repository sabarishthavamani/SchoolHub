import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import {getSingleDriver} from '../actions/adminAction'

const disableAddBtn = "";

const initialFormValue = {
  vehicleNumber: "",
  driverName: "",
  attenderName: "",
  busStartingPoint: "",
  busStartingTime: "",
  busStop1: "",
  stop1Timing: "",
  busStop2: "",
  stop2Timing: "",
  busStop3: "",
  stop3Timing: "",
};

const DriverAllocation = () => {
  const params = useParams()

  const [formValue, setFormValue] = useState(initialFormValue);
  const [driverData, setDriverData] = useState("")

  const handleFormValue = (e) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(formValue);
  };

  const getData = async () => {
    const {Id} = params
    try {
      let { status, result } = await getSingleDriver(Id)
      if (status === true) {
        setDriverData(result)
      }
    } catch (err) {
      console.log(err, "--err");
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div className="fee-collection">
      <Sidebar />
      <div className="fee-content">
        <Navbar pageTitle={"Driver Allocation"} />
        <div className="fee-setup">
          <div className="fee-setup-header">
            <span>Driver Allocation</span>
          </div>
          <div className="driver-allocate-container">
            <form className="driver-allocate-form">
              <div className="driver-allocate-part-one">
                <div className="driver-allocate-input">
                  <label htmlFor="vehicleNumber">
                    Vehicle Number<sup>*</sup>
                  </label>
                  <select
                    name="vehicleNumber"
                    id="vehicleNumber"
                    onChange={handleFormValue}
                    value={formValue.vehicleNumber}
                  >
                    <option value=""></option>
                    <option value="V0001">1</option>
                    <option value="V0002">2</option>
                    <option value="V0003">3</option>
                    <option value="V0004">4</option>
                    <option value="V0005">5</option>
                  </select>
                </div>
                <div className="driver-allocate-input">
                  <label htmlFor="driverName">
                    Driver Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="driverName"
                    id="driverName"
                    onChange={handleFormValue}
                    value={driverData.name}
                    readOnly
                  />
                </div>
                <div className="driver-allocate-input">
                  <label htmlFor="attenderName">
                    Attender Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="attenderName"
                    id="attenderName"
                    onChange={handleFormValue}
                    value={formValue.attenderName}
                  />
                </div>
              </div>
              <div className="driver-allocate-part-two">
                <div className="driver-allocate-part-two-sections">
                  <div className="driver-allocate-input">
                    <label htmlFor="busStartingPoint">
                      Bus Starting Point<sup>*</sup>
                    </label>
                    <select
                      name="busStartingPoint"
                      id="busStartingPoint"
                      onChange={handleFormValue}
                      value={formValue.busStartingPoint}
                      style={{ color: "#BDBDBD", fontSize: "12" }}
                    >
                      <option value="">select Location</option>
                      <option value="annaNagar">Anna Nagar</option>
                    </select>
                  </div>
                  <div className="driver-allocate-input">
                    <label htmlFor="busStartingTime">
                      Bus Starting Time<sup>*</sup>
                    </label>
                    <input
                      type="time"
                      name="busStartingTime"
                      id="busStartingTime"
                      onChange={handleFormValue}
                      value={formValue.busStartingTime}
                    />
                  </div>
                </div>
                <div className="driver-allocate-part-two-sections">
                  <div className="driver-allocate-input">
                    <label htmlFor="busStop1">
                      Bus Stop 1<sup>*</sup>
                    </label>
                    <select
                      name="busStop1"
                      id="busStop1"
                      onChange={handleFormValue}
                      value={formValue.busStop1}
                      style={{ color: "#BDBDBD", fontSize: "12" }}
                    >
                      <option value="">select Location</option>
                      <option value="annaNagar">Anna Nagar</option>
                    </select>
                  </div>
                  <div className="driver-allocate-input">
                    <label htmlFor="stop1Timing">
                      Stop 1 Timing<sup>*</sup>
                    </label>
                    <input
                      type="time"
                      name="stop1Timing"
                      id="stop1Timing"
                      onChange={handleFormValue}
                      value={formValue.stop1Timing}
                    />
                  </div>
                </div>
                <div className="driver-allocate-part-two-sections">
                  <div className="driver-allocate-input">
                    <label htmlFor="busStop2">
                      Bus Stop 2<sup>*</sup>
                    </label>
                    <select
                      name="busStop2"
                      id="busStop2"
                      onChange={handleFormValue}
                      value={formValue.busStop2}
                      style={{ color: "#BDBDBD", fontSize: "12" }}
                    >
                      <option value="">select Location</option>
                      <option value="annaNagar">Anna Nagar</option>
                    </select>
                  </div>
                  <div className="driver-allocate-input">
                    <label htmlFor="stop2Timing">
                      Stop 1<sup>*</sup>
                    </label>
                    <input
                      type="time"
                      name="stop2Timing"
                      id="stop2Timing"
                      onChange={handleFormValue}
                      value={formValue.stop2Timing}
                    />
                  </div>
                </div>
                <div className="driver-allocate-part-two-sections">
                  <div className="driver-allocate-input">
                    <label htmlFor="busStop3">
                      Bus Stop 3<sup>*</sup>
                    </label>
                    <select
                      name="busStop3"
                      id="busStop3"
                      onChange={handleFormValue}
                      value={formValue.busStop3}
                      style={{ color: "#BDBDBD", fontSize: "12" }}
                    >
                      <option value="">select Location</option>
                      <option value="annaNagar">Anna Nagar</option>
                    </select>
                  </div>
                  <div className="driver-allocate-input">
                    <label htmlFor="stop3Timing">
                      Stop 1<sup>*</sup>
                    </label>
                    <input
                      type="time"
                      name="stop3Timing"
                      id="stop3Timing"
                      onChange={handleFormValue}
                      value={formValue.stop3Timing}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="teacher-allocation-btn">
            <button
              type="button"
              disabled={disableAddBtn}
              style={{ backgroundColor: disableAddBtn ? null : "gray" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAllocation;
