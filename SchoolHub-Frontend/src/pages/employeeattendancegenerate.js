import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  viewDriver,
  viewTeacher,
  employeemonthly,
} from "../actions/adminAction";
import AdminSidebar from "./components/Adminsidebar";
import AdminHeader from "./components/AdminHeader";
import toastAlert from "../lib/toast";

const initialFormValue = {
  admissiongrade: "",
  section: "",
  month: new Date().getMonth() + 1,
  attendance: "",
};

const EmployeeAttendanceGenerate = () => {
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const navigator = useNavigate();
  const [formValue, setFormValue] = useState({
    leaveType: "All",
    month: "",
  });
  const [pagination, setPagination] = useState(false);

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

  const getData = async () => {
    try {
      if (selectedMonth) {
        let result = await fetchTeacherAndDriverData();
        setLoaderView(false);
        setData(result);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedMonth]);

  const fetchTeacherAndDriverData = async () => {
    try {
      const [teacherData, driverData] = await Promise.all([
        viewTeacher(),
        viewDriver(),
      ]);

      if (teacherData.status && driverData.status) {
        const selectedMonthIndex = parseInt(formValue.month) - 1;
        const selectedYear =
          selectedMonthIndex !== -1 ? new Date().getFullYear() : "";
        const selectedMonthName = monthNames[selectedMonthIndex];

        const teacherResult = teacherData.result.map((teacherItem) => {
          return {
            category: "Teacher",
            employeeId: teacherItem.teacherId,
            name: teacherItem.name,
            month: selectedMonthName, // Set month name
            year: selectedYear,
          };
        });

        const driverResult = driverData.result.map((driverItem) => {
          return {
            category: "Driver",
            employeeId: driverItem.driverId,
            name: driverItem.name,
            month: selectedMonthName, // Set month name
            year: selectedYear,
          };
        });

        return [...teacherResult, ...driverResult];
      } else {
        return [];
      }
    } catch (error) {
      console.error(
        "Error occurred while fetching teacher and driver data:",
        error
      );
      return [];
    }
  };

  // const catagoryhandleSubmit = async () => {
  //   const { month } = formValue;
  //   if (formValue) {
  //     setLoaderView(true);
  //     setSelectedMonth(parseInt(month));
  //     getData();
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setSelectedMonth(parseInt(value));
    setPagination(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        year: new Date().getFullYear(),
        month: monthNames[parseInt(formValue.month) - 1],
        EmployeMonthlyAttendance: data,
      };

      const response = await employeemonthly(formData);

      if (response && response.status === true) {
        toastAlert("success", response.message);
        navigator("/payrollList");
      } else {
        toastAlert("error", response.message || "Failed to save payroll data.");
      }
    } catch (error) {
      console.error("Error occurred while saving payroll data:", error);
      toastAlert(
        "error",
        "Failed to save payroll data. Please try again later."
      );
    }
  };

  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(data.length / pageSize);

    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }

    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />

        <div className="att-sheet">
          <div className="class-details">
            <div className="std-class">
              <label>Month</label>
              <select
                name="month"
                value={formValue.month}
                onChange={handleChange}
              >
                <option value="">Select Month</option>
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="header" style={{ marginTop: "-30px" }}>
            <div className="l-header d-flex align-center">
              <p className="m-2 text-dark">Monthly Attendance</p>
            </div>
          </div>

          <div
            className="att-record"
            style={{ flex: "none", maxHeight: "500px" }}
          >            <table className="sheet">
              <thead>
                <tr className="sheet-head">
                  <th>S.No</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="sheet-body" key={index + indexOfFirstItem + 1}>
                    <td>{index + indexOfFirstItem + 1}</td>
                    <td>{item.employeeId}</td>
                    <td style={{ textAlign: "center" }}>{item.name}</td>
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
                Page {currentPage} of {Math.ceil(data.length / pageSize)}
              </span>
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(data.length / pageSize)}
                style={{
                  marginLeft: "14px",
                  backgroundColor: "#FF3672",
                  width: "130px",
                  border: "none",
                  padding: "5px 5px",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "15px",
                  alignItems: "center",
                }}
              >
                Next
              </button>
            </div>
          )}
          {pagination && (
            <button
            className="sheet-button"
            type="button"
              onClick={handleSubmit}
              // style={{marginBottom:"-250px"}}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceGenerate;
