import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";

const VehicleFormOne = ({ handleNextClick, setFormValue, formValue }) => {
  const {
    vehicleRegisterNumber,
    vehicleType,
    manufacturer,
    seatingCapacity,
    ownerName,
    status,
    registrationDate,
    mileage,
  } = formValue;

  const isButtonDisable =
    vehicleRegisterNumber !== "" &&
    vehicleType !== "" &&
    manufacturer !== "" &&
    seatingCapacity !== "" &&
    ownerName !== "" &&
    status !== "" &&
    registrationDate !== "" &&
    mileage !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const triggerNextForm = () => {
    handleNextClick();
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
                  <label htmlFor="VehicleRegisterNumber">
                    Vehicle Register Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="vehicleRegisterNumber"
                    id="VehicleRegisterNumber"
                    value={vehicleRegisterNumber}
                    onChange={handleChange}
                    maxLength={20}
                    style={{ textTransform: "uppercase" }}
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="VehicleType">
                    Vehicle Type<sup>*</sup>
                  </label>
                  <select
                    type="number"
                    name="vehicleType"
                    id="VehicleType"
                    value={vehicleType}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="bus">Bus</option>
                    <option value="van">Van</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="Manufacturer">
                    Vehicle Manufacturer<sup>*</sup>
                  </label>
                  <select
                    id="Manufacturer"
                    name="manufacturer"
                    value={manufacturer}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="tataMotors">Tata Motors</option>
                    <option value="ashokLeyland">Ashok Leyland</option>
                    <option value="eicher">Eicher Motors</option>
                    <option value="bharatBenz">BharatBenz</option>
                    <option value="volvo">Volvo Buses</option>
                    <option value="mahindra">Mahindra</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="RegistrationDate">
                    Registration Date<sup>*</sup>
                  </label>
                  <div className="date-input-container ">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={registrationDate}
                      placeholder="DD/MM/YYYY"
                      readOnly
                    />
                    <input
                      type="date"
                      name="registrationDate"
                      onChange={handleChange}
                      id="RegistrationDate"
                    />
                  </div>
                </div>
                <div className="teach-box">
                  <label htmlFor="Status">
                    Vehicle Status<sup>*</sup>
                  </label>
                  <select
                    name="status"
                    value={status}
                    onChange={handleChange}
                    id="Status"
                  >
                    <option value=""></option>
                    <option value="active">Active</option>
                    <option value="inActive">Inactive</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="OwnerName">
                    Owner Name<sup>*</sup>
                  </label>
                  <input
                    id="OwnerName"
                    type="text"
                    name="ownerName"
                    value={ownerName}
                    onChange={handleChange}
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="SeatingCapacity">
                    Seating Capacity<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    name="seatingCapacity"
                    value={seatingCapacity}
                    onChange={handleChange}
                    id="SeatingCapacity"
                  />
                </div>
                <div className="teach-box">
                  <label id="Mileage">
                    Mileage<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="Mileage"
                    value={mileage}
                    onChange={handleChange}
                    name="mileage"
                    placeholder="Per Liter"
                  />
                </div>
              </form>
            </div>

            <div className="sub-btnn">
              <div className="sub-btnn button">
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
      </div>
    </>
  );
};

export default VehicleFormOne;
