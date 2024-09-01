import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { IoIosCloseCircleOutline } from "react-icons/io";

const VehicleInfo = (props) => {
  const {
    teacherDetails,
    studentDetails,
    driverDetails,
    vehicleDetails,
    busAllocateDetails,
    setshowVehicleInfo,
  } = props;

  const teachFilter = teacherDetails.filter(
    (eachItem) => eachItem.vehicleRoute === vehicleDetails.vehicleRoute
  );
  const studentFilter = studentDetails.filter(
    (eachItem) => eachItem.vehicleRoute === vehicleDetails.vehicleRoute
  );
  const driverFilter = driverDetails.find(
    (eachItem) => eachItem.vehicleRoute === vehicleDetails.vehicleRoute
  );
  const attenderFilter = busAllocateDetails.find(
    (eachItem) => eachItem.vehicleRoute === vehicleDetails.vehicleRoute
  );

  return (
    <div className="edit-mark-body">
      <div className="edit-mark-container" style={{ height: "85%" }}>
        <button type="button" onClick={() => setshowVehicleInfo(false)}>
          <IoIosCloseCircleOutline size={35} />
        </button>
        <div
          className="std-personal-info"
          id="information"
          style={{ maxHeight: "600px", overflowY: "scroll", margin: "auto" }}
        >
          <div className="std-name">
            <span>{vehicleDetails.vehicleNumber}</span>
            <h5 style={{ color: "blue" }}> Bus Route</h5>
            <span>{vehicleDetails.vehicleRoute}</span>
          </div>
          <div className="std-history">
            <div className="std-name">
              <span>Passenger Details</span>
            </div>
            <div className="adrs">
              <p>
                Driver Name :{" "}
                <span>
                  {driverFilter && driverFilter.name ? driverFilter.name : ""}
                </span>
              </p>
            </div>
            <div className="adrs">
              <p>
                Attender Name :{" "}
                <span>
                  {attenderFilter && attenderFilter.attender
                    ? attenderFilter.attender
                    : ""}
                </span>{" "}
              </p>
            </div>
          </div>
          <div
            className={
              studentFilter.length === 0 ||
              studentFilter.length === 1 ||
              studentFilter.length === 2
                ? "std-history"
                : "std-history2"
            }
          >
            <div style={{ color: "#ff80a6", fontWeight: 600 }}>
              Students list
            </div>
            <div className="adrs">
              <ul className="student-list">
                {studentFilter &&
                  studentFilter.map((item, index) => (
                    <li key={index} style={{ listStyleType: "none" }}>
                      <span style={{ marginRight: "5px" }}>{index + 1}.</span>{" "}
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div
            className={
              teachFilter.length === 0 ||
              teachFilter.length === 1 ||
              teachFilter.length === 2
                ? "std-history"
                : "std-history2"
            }
            style={{}}
          >
            <div style={{ color: "#ff80a6", fontWeight: 600 }}>
              Teachers list
            </div>
            <div className="adrs">
              <ul className="student-list">
                {teachFilter &&
                  teachFilter.map((item, index) => (
                    <li key={index} style={{ listStyleType: "none" }}>
                      <span style={{ marginRight: "5px" }}>{index + 1}.</span>{" "}
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VehicleInfo;
