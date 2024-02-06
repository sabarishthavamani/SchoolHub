import React from "react";

const VehicleFormOne = ({ handleNextClick, setFormValue, formValue }) => {
  const {
    vehicleNumber,
    vehicleRegisterNumber,
    manufacturer,
    seatingCapacity,
    ownerName,
    status,
    registrationDate,
    mileage,
  } = formValue;

  const isButtonDisable =
    vehicleNumber !== "" &&
    vehicleRegisterNumber !== "" &&
    manufacturer !== "" &&
    seatingCapacity !== "" &&
    ownerName !== "" &&
    status !== "" &&
    registrationDate !== "" &&
    mileage !== "";

    const handleChange = (e) => {
        const { name, value } = e.target;
          setFormValue({ ...formValue, [name]: value });
      }

  const triggerNextForm = () => {
    handleNextClick();
  };

  return (
    <>
      <div className="teacher-details">
        <div className="teacher-header">
          <ion-icon name="person" />
          <span>Vehicle Details</span>
        </div>
        <form action="" className="teacher-form">
          <div className="teach-box">
            <label htmlFor="VehicleNumber">
              Vehicle Number<sup>*</sup>
            </label>
            <input
              type="number"
              name="vehicleNumber"
              id="VehicleNumber"
              value={vehicleNumber}
              onChange={handleChange}
            />
          </div>
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
              style={{textTransform: 'uppercase'}}
            />
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
            <label id="Mileage">Mileage<sup>*</sup></label>
            <input type="number" id="Mileage" value={mileage} onChange={handleChange} name="mileage" placeholder="Per Liter" />
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
    </>
  );
};

export default VehicleFormOne;
