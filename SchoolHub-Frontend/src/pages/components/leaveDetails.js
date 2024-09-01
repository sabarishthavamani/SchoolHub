import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveApproval from "../leaveApproval";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";
import { leaveformDislay } from "../../actions/adminAction";

const LeaveDetails = () => {
  const navigate = useNavigate();
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState({
    approvalPage: false,
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [ispayrollGenerated, setIspayrollGenerated] = useState(false);

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
    setSelectedMonth(currentMonthName);
    getData(currentMonthName);
  }, []);

  useEffect(() => {
    if (selectedMonth && showDetails) {
      getData(selectedMonth);
    }
  }, [selectedMonth, showDetails]);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    getData(month);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getData = async (month) => {
    try {
      if (month) {
        const selectedData = await leaveformDislay(month);
        const leaveformDisplay = selectedData?.result || [];
        setData(leaveformDisplay);
        console.log("Filtered Data:", leaveformDisplay);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  const ApprovingLeave = (data) => {
    const {
      _id,
      employeeId,
      name,
      fromDate,
      toDate,
      numofDays,
      reason,
      approval,
      leaveType,
      reasonDecline,
    } = data;

    localStorage.setItem("id", _id);
    localStorage.setItem("employeeId", employeeId);
    localStorage.setItem("name", name);
    localStorage.setItem("fromDate", fromDate);
    localStorage.setItem("toDate", toDate);
    localStorage.setItem("numofDays", numofDays);
    localStorage.setItem("reason", reason);
    localStorage.setItem("approval", approval);
    localStorage.setItem("leaveType", leaveType);
    localStorage.setItem("reasonDecline", reasonDecline);
    setSelectedRecord(_id);
    setShowPopup({ approvalPage: true });
  };

  const getApprovalColor = (status) => {
    switch (status) {
      case "Applied":
        return "blue";
      case "Accept":
        return "green";
      case "Pending":
        return "orange";
      case "Decline":
        return "red";
      default:
        return "black";
    }
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
        item.name.toLowerCase().includes(userInput) ||
        item.employeeId.toLowerCase().includes(userInput)
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
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />
        <div className="att-sheet">
          <div className="class-details">
            <div className="std-class" style={{ marginTop: "15px" }}>
              <select
                name="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                disabled={submitDisable}
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="header" style={{ marginTop: "-30px" }}>
            <div className="l-header d-flex align-center">
              <p className="m-2 text-dark">Leave List</p>
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

          {data.length > 0 ? (
            <div
              className="att-record"
              style={{ flex: "none", maxHeight: "500px" }}
            >
              <table className="sheet">
                <thead>
                  <tr className="sheet-head">
                    <th>S.No</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Applied Date</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Num Of Days</th>
                    <th>Leave Type</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr
                      className="sheet-body"
                      key={index + indexOfFirstItem + 1}
                    >
                      <td>{index + indexOfFirstItem + 1}</td>
                      <td>{item.employeeId}</td>
                      <td>{item.name}</td>
                      <td>{item.currentDate}</td>
                      <td>{item.fromDate}</td>
                      <td>{item.toDate}</td>
                      <td>{item.numofDays}</td>
                      <td>{item.leaveType}</td>
                      <td>{item.reason}</td>
                      <td onClick={() => ApprovingLeave(item)}>
                        <span
                          className="due2"
                          style={{
                            color: getApprovalColor(item.approval),
                            cursor: "pointer",
                          }}
                        >
                          {item.approval}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="att-record"
              style={{ flex: "none", maxHeight: "500px" }}
            >
              <table className="sheet">
                <thead>
                  <tr className="sheet-head">
                    <th>S.No</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Applied Date</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Num Of Days</th>
                    <th>Leave Type</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
              </table>
              <p>No data available for the selected month.</p>
            </div>
          )}

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
              Page {currentPage} of {Math.ceil(filteredData?.length / pageSize)}
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
            </button>
          </div>
        </div>
      </div>
      {showPopup.approvalPage && selectedRecord && (
        <div className="teacher-schedule-pop">
          <div
            className="schedule-pop-overlay"
            onClick={() =>
              setShowPopup((prev) => ({
                ...prev,
                approvalPage: false,
              }))
            }
          ></div>
          <div className="schedule-pop-container">
            <LeaveApproval id={selectedRecord} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveDetails;
