import React, { useEffect, useState } from "react";
import { employeedayattendance, employeeperday } from "../actions/adminAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faL,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const EmployeeAttendance = () => {
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formValue, setFormValue] = useState({
    leaveType: "All",
    month: new Date().getMonth() + 1,
    date: "",
  });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isSheetGenerated, setIsSheetGenerated] = useState(false);
  const [pagination, setpagination] = useState(false);

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

  const catagoryhandleSubmit = async () => {
    const { month, date } = formValue;
    if (formValue) {
      setLoaderView(true);
      setSelectedMonth(parseInt(month));
      setSelectedDate(date);
      setIsSheetGenerated(true);
      getData();
      setpagination(true);
    }
  };

  const getData = async () => {
    try {
      if (selectedMonth && selectedDate) {
        const month = monthNames[selectedMonth - 1];

        const formattedDate = new Date(selectedDate);
        const day = formattedDate.getDate();
        const year = formattedDate.getFullYear();
        const formattedDateString = `${day} ${month} ${year}`;
        const date = formattedDateString;

        const result = await employeeperday(formValue, month, date);
        console.log("result............", result);
        if (result && result.status) {
          setData(result.result);
          setFilteredData(result.result); // Initialize filteredData with the fetched data
          setCurrentPage(1); // Reset to first page
        }
        setLoaderView(false);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedMonth, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const toggleEditMode = (index) => {
    setEditIndex(index === editIndex ? null : index);
    setSelectedStatus(index === editIndex ? "" : data[index].dayData.status);
  };

  const handleStatusChange = (index, e) => {
    const newData = [...data];
    newData[index].dayData.status = e.target.value;
    setData(newData);
    setSelectedStatus(index, e);
  };

  const handleConfirm = async (index) => {
    try {
      const { employeeId } = data[index];
      const { month, date } = formValue;
      const formData = data[index].dayData;

      const monthString = monthNames[parseInt(month) - 1];
      const selectedDate = new Date(date);
      const formattedDate = `${selectedDate.getDate()} ${monthString} ${selectedDate.getFullYear()}`;
      const { status, message } = await employeedayattendance(
        formData,
        monthString,
        formattedDate,
        employeeId
      );

      if (status) {
        console.log("Attendance data updated successfully:", message);
      } else {
        console.error("Error updating attendance data:", message);
      }

      setEditIndex(null);
    } catch (error) {
      console.error("Error occurred while confirming changes:", error);
    }
  };

  const handleCancel = (index) => {
    setSelectedStatus(data[index].dayData.status);
    setEditIndex(null);
  };

  const close = () => {
    window.location.reload();
  };

  const renderActionButtons = (index) => {
    if (editIndex === index) {
      return (
        <>
          <button className="p-a prs" onClick={() => handleConfirm(index)}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="p-a abs" onClick={() => handleCancel(index)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      );
    }
  };

  const renderIcon = (index) => {
    if (editIndex !== index) {
      return (
        <i
          className="fa fa-pencil"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => toggleEditMode(index)}
        />
      );
    }
  };

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [userSearchInput, setUserSearchInput] = useState("");

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
              <label>Month</label>
              <select
                name="month"
                value={formValue.month}
                onChange={handleChange}
                disabled={isSheetGenerated}
              >
                <option value="">Select Month</option>
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="std-class">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formValue.date}
                onChange={handleChange}
                disabled={isSheetGenerated}
              />
            </div>
            <button
              className="sheet-button"
              type="button"
              onClick={catagoryhandleSubmit}
              disabled={isSheetGenerated}
            >
              Generate Sheet
            </button>
          </div>

          <div className="header" style={{ marginTop: "-30px" }}>
            <div className="l-header d-flex align-center">
              <p className="m-2 text-dark">Daily Attendance</p>
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
            <table className="sheet">
              <thead>
                <tr className="sheet-head">
                  <th>S.No</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="sheet-body" key={index + indexOfFirstItem + 1}>
                    <td>{index + indexOfFirstItem + 1}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.name}</td>
                    <td>
                      {editIndex === index ? (
                        <select
                          value={item.dayData.status}
                          className={
                            selectedStatus === "Present" ? "Present" : "Absent"
                          }
                          onChange={(e) =>
                            handleStatusChange(indexOfFirstItem + index, e)
                          }
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Holiday">Holiday</option>
                        </select>
                      ) : (
                        item.dayData.status
                      )}
                    </td>
                    <td className="edit" id="ed">
                      <div className="dropdown">
                        {renderIcon(indexOfFirstItem + index)}
                        {renderActionButtons(indexOfFirstItem + index)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pagination && (
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
                {Math.ceil(filteredData.length / pageSize)}
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
          )}
          {pagination && (
            <button className="sheet-button" type="button" onClick={close}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
