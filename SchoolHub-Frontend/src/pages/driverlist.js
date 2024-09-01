import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faMoneyCheck,
  faSchool,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";
import { viewDriver, deleteDriver } from "../actions/adminAction";
import toastAlert from "../lib/toast";
import DriverInfo from "./components/driverinfo";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const DriverList = () => {
  const [data, setData] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState("");
  const [showDriverInfo, toggleDriverInfo] = useState(false);
  const [clickedDriverDetails, setDriverDetails] = useState({});
  const [userSearchInput, setUserSearchInput] = useState("");
  const [sortGrade, setGradeSort] = useState("");
  const [isAsc, setSortedData] = useState(true);
  const [sortKey, setSortKey] = useState("");
  const [loaderView, setLoaderView] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectingStudents, setSelectingStudents] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredData, setFilteredData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const navigate = useNavigate();

  const editDriverDetail = (id) => {
    navigate(`/driver-edit/${id}`);
  };

  const busAllocation = (id) => {
    navigate(`/driver-allocate/${id}`);
  };

  const removeDriver = async (Id) => {
    try {
      let { status, message } = await deleteDriver(Id);
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

  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    if (action) {
      removeDriver(Id);
    }
  };

  const getData = async () => {
    try {
      let { status, result, imageUrl } = await viewDriver();
      if (status === true) {
        setLoaderView(false);
        const filteredData = result.filter(
          (each) =>
            each.active === 1 &&
            (each.name.toLowerCase().includes(userSearchInput.toLowerCase()) ||
              each.driverId
                .toLowerCase()
                .includes(userSearchInput.toLowerCase()))
        );
        setData(result);
        setFilteredData(filteredData);
        setIMAGE_URL(imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [userSearchInput]);

  const handleDriverInfo = (id) => {
    let driverDetails = data.find((eachItem) => eachItem.driverId === id);
    if (driverDetails) {
      setDriverDetails(driverDetails);
      toggleDriverInfo(true);
    }
  };

  const sortData = (key) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return isAsc ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleSorting = (key) => {
    if (sortKey === key) {
      setSortedData(!isAsc);
    } else {
      setSortKey(key);
      setSortedData(true);
    }
    sortData(key);
  };

  // Update handleSearchInput to reset currentPage when the search input changes
  const handleSearchInput = (event) => {
    const userInput = event.target.value.toLowerCase();
    setUserSearchInput(userInput);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(userInput) ||
        item.driverId.toLowerCase().includes(userInput)
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
  const renderUserView = () => {
    if (loaderView) {
      return (
        <div className="loader-view-container">
          <div class="spinner-box">
            <div class="pulse-container">
              <div class="pulse-bubble pulse-bubble-1"></div>
              <div class="pulse-bubble pulse-bubble-2"></div>
              <div class="pulse-bubble pulse-bubble-3"></div>
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />
        <div className="att-sheet">
          <h2 className="dashboard-title">Driver Details</h2>
          <div className="middle-header-right" style={{ height: "50px" }}>
            <input
              type="search"
              placeholder="search"
              onChange={handleSearchInput}
              value={userSearchInput}
            />
          </div>
          <div
            className="att-record"
            style={{ marginTop: "10px", maxHeight: "70%" }}
          >
            <table className="sheet">
              <thead>
                <tr className="sheet-head">
                  <th>S.No</th>
                  <th>Driver ID</th>
                  <th>
                    Name
                    <button
                      type="button"
                      className="name-sort-btn"
                      onClick={() => handleSorting("name")}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>Role</th>
                  <th>BusNo</th>
                  <th>Contact Number</th>
                  <th>Experience</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => {
                  const key = indexOfFirstItem + index + 1;
                  return (
                    <tr className="sheet-body" key={key}>
                      <td>{key}</td>
                      <td>{item.driverId}</td>
                      <td className="profile">
                        <img
                          src={`${IMAGE_URL}/${item.driverphoto}`}
                          alt=""
                          onClick={() => handleDriverInfo(item.driverId)}
                        />
                        <span
                          key={key}
                          onClick={() => handleDriverInfo(item.driverId)}
                        >
                          {item.name}
                        </span>
                      </td>
                      <td>{item.role}</td>
                      <td>
                        <span className="grade">
                          {item.vehicleRegisterNumber}
                        </span>
                      </td>
                      <td>+91{item.phoneNumber}</td>
                      <td>{item.drivingexperience}</td>
                      <td className="edit" id="ed">
                      <div className="dropdown">
                          <FontAwesomeIcon
                            icon={faEllipsis}
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                          />
                          <ul
                            className="dropdown-menu"
                            style={{ background: "#fafafa", padding: "0" }}
                          >
                            <li className="edit-box">
                              <a
                                className="dropdown-item"
                                href="#"
                                style={{ color: "blue" }}
                                onClick={() => editDriverDetail(item._id)}
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
                                  onClick={() => openBasic(item._id)}
                                >
                                  <i
                                    className="fa fa-trash-o"
                                    style={{ color: "red", marginRight: 10 }}
                                  />
                                  Clear
                                </a>
                              </Button>
                            </li>
                            {item.role === "Driver" && (
                              <li className="edit-box">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => busAllocation(item._id)}
                                  style={{ color: "revert-layer" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faSchool}
                                    style={{
                                      color: "revert-layer",
                                      marginRight: "5px",
                                    }}
                                  />
                                  Bus-allocate
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pagination" style={{ marginBlock: "20px" }}>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                marginRight: "10px",
                backgroundColor: "#FF3672",
                width: "110px",
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
              Page {currentPage} of {Math.ceil(filteredData.length / pageSize)}
            </span>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredData.length / pageSize)
              }
              style={{
                marginLeft: "14px",
                backgroundColor: "#FF3672",
                width: "130px",
                border: "none",
                padding: "5px 5px",
                borderRadius: "20px",
                color: "white",
                fontSize: "15px",
              }}
            >
              Next
            </button>
          </div>
         

        </div>
      </div>
    </div>
  );
};
  return (
    <div className="student-container">
     
        {renderUserView()}
      
        {showDriverInfo && (
        <DriverInfo
          IMAGE_URL={IMAGE_URL}
          driverDetails={clickedDriverDetails}
          toggleDriverInfo={toggleDriverInfo}
        />
      )}
    </div>
  );
};

export default DriverList;
