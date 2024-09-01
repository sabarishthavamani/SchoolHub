import React, { useEffect, useState } from "react";

import {
  displayBusAllocation,
  getAllVehicle,
  viewDriver,
  viewStudent,
  viewTeacher,
} from "../actions/adminAction";
import Sidebar from "./components/sidebar";

import { useNavigate, useParams } from "react-router-dom";

//react confirm pop-up package

import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";

import { deleteVehicleDetail } from "../actions/adminAction";

import toastAlert from "../lib/toast";

//fontawesome pacakage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSchool } from "@fortawesome/free-solid-svg-icons";
import DriverInfo from "./components/driverinfo";
import VehicleInfo from "./components/vehicleinfo";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const VehicleList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loaderView, setLoaderView] = useState(true);
  const [vehicleDetails, setvehicleDetails] = useState({});
  const [showVehicleInfo, setshowVehicleInfo] = useState(false);
  const [teacherDisplay, setteacherDisplay] = useState({});
  const [studentDisplay, setstudentDisplay] = useState({});
  const [driverDisplay, setdriverDisplay] = useState({});
  const [busAllocateDisplay, setbusAllocateDisplay] = useState({});

  const getData = async () => {
    try {
      let { status, result } = await getAllVehicle();

      if (status) {
        const vehicleData = await result.filter((each) => each.active === 1);
        setLoaderView(false);
        setData(vehicleData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const editVehicle = async (Id) => {
    navigate(`/vehicle-edit/${Id}`);
  };

  const deleteVehicle = async (Id) => {
    try {
      let { status, message } = await deleteVehicleDetail(Id);
      if (status === true) {
        toastAlert("success", message);
        getData();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };

  //confirmation pop-up box
  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    // action
    if (action) {
      deleteVehicle(Id);
    }
  };

  const routeAllocation = (Id) => {
    navigate(`/route-allocate/${Id}`);
  };

  const handleDriverInfo = async (id) => {
    const teacher = await viewTeacher();
    const student = await viewStudent();
    const driver = await viewDriver();
    const busAllocate = await displayBusAllocation();
    const teacherData = teacher.result;
    const studentData = student.result;
    const driverDisplay = driver.result;
    const busDisplay = busAllocate.result;

    let vehicleDetails2 = data.find(
      (eachItem) => eachItem.vehicleNumber === id
    );

    setvehicleDetails(vehicleDetails2);
    setteacherDisplay(teacherData);
    setstudentDisplay(studentData);
    setdriverDisplay(driverDisplay);
    setbusAllocateDisplay(busDisplay);
    setshowVehicleInfo(true);
  };

  // Pagination
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [userSearchInput, setUserSearchInput] = useState("");

  useEffect(() => {
    setFilteredData(data); // Initialize filteredData when data is set
  }, [data]);

  const handleSearchInput = (event) => {
    const userInput = event.target.value.toLowerCase();
    setUserSearchInput(userInput);
    const filtered = data.filter(
      (item) =>
        item.vehicleNumber.toLowerCase().includes(userInput) ||
        item.vehicleRoute.toLowerCase().includes(userInput)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(filteredData.length / pageSize);

    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }

    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="student-container">
      <div className="attendance">
        <AdminHeader />
        <div className="attendance-content">
          <AdminSidebar />
          <div className="att-sheet">
            <div className="header" style={{ marginTop: "5px" }}>
              <div className="l-header d-flex align-center">
                <p className="m-2 text-dark">Vehicle List</p>
              </div>
              <div className="middle-header-right">
                <input
                  type="search"
                  placeholder="search"
                  onChange={handleSearchInput}
                  value={userSearchInput}
                />
              </div>
            </div>
            <div
              className="att-record"
              style={{ flex: "none", maxHeight: "500px" }}
            >
              <div>
                <table className="sheet">
                  <thead>
                    <tr className="sheet-head">
                      <th>S.No</th>
                      <th>vehicle No</th>
                      <th>Vehicle Type</th>
                      <th>Register Number</th>
                      <th>Manufacturer</th>
                      <th>Status</th>
                      <th>Route</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData &&
                      currentData.length > 0 &&
                      currentData.map((item, index) => {
                        return (
                          <tr
                            className="sheet-body"
                            key={index + indexOfFirstItem + 1}
                          >
                            <td>{index + indexOfFirstItem + 1}</td>
                            <td>
                              <span
                                style={{ cursor: "pointer" }}
                                // key={key}
                                onClick={() =>
                                  handleDriverInfo(item.vehicleNumber)
                                }
                              >
                                {item.vehicleNumber}
                              </span>
                            </td>

                            <td>{item.vehicleType}</td>
                            <td>{item.vehicleRegisterNumber.toUpperCase()}</td>
                            <td>{item.manufacturer.toUpperCase()}</td>
                            <td>{item.status}</td>
                            <td>{item.vehicleRoute}</td>
                            <td className="edit" id="ed">
                              <div className="dropdown">
                                <FontAwesomeIcon
                                  icon={faEllipsis}
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                />
                                <ul
                                  className="dropdown-menu"
                                  style={{
                                    background: "#fafafa",
                                    padding: "0",
                                  }}
                                >
                                  <li className="edit-box">
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      style={{ color: "blue" }}
                                      onClick={() => editVehicle(item._id)}
                                    >
                                      <i
                                        className="fa fa-pencil"
                                        style={{ color: "blue" }}
                                      />
                                      Edit
                                    </a>
                                  </li>
                                  <li className="edit-box">
                                    <Button
                                      className="pop-up-button"
                                      onClick={() => openBasic(item._id)}
                                    >
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        style={{ color: "red" }}
                                      >
                                        <i
                                          className="fa fa-trash-o"
                                          style={{
                                            color: "red",
                                            marginRight: 10,
                                          }}
                                        />
                                        Delete
                                      </a>
                                    </Button>
                                  </li>
                                  <li className="edit-box">
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() => routeAllocation(item._id)}
                                      style={{ color: "revert-layer" }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faSchool}
                                        style={{
                                          color: "revert-layer",
                                          marginRight: "5px",
                                        }}
                                      />
                                      Rout Allocate
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pagination" style={{ marginBlock: "20px" }}>
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#FF3672",
                  width: "90px",
                  border: "none",
                  padding: "5px 5px",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Previous
              </button>
              <span className="pagination-info" style={{ marginTop: "5px" }}>
                Page {currentPage} of{" "}
                {Math.ceil(filteredData?.length / pageSize)}
              </span>
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredData?.length / pageSize)
                }
                style={{
                  marginLeft: "14px",
                  backgroundColor: "#FF3672",
                  width: "90px",
                  border: "none",
                  padding: "5px 5px",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Next
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
      {showVehicleInfo && (
        <VehicleInfo
          teacherDetails={teacherDisplay}
          studentDetails={studentDisplay}
          driverDetails={driverDisplay}
          vehicleDetails={vehicleDetails}
          busAllocateDetails={busAllocateDisplay}
          setshowVehicleInfo={setshowVehicleInfo}
        />
      )}
    </div>
  );
};

export default VehicleList;
