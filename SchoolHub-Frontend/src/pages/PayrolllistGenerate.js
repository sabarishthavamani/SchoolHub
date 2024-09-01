import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import {
  leaveDisplay,
  payrollsalary,
  salaryformUpdate,
  selectedmonthDisplay,
  viewDriver,
  viewTeacher,
} from "../actions/adminAction";
import toastAlert from "../lib/toast";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const PayrolllistGenerate = () => {
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const navigator = useNavigate();
  const [submitDisable, setsubmitDisable] = useState(false);
  const [ispayrollGenerated, setispayrollGenerated] = useState(false);
  const [formValue, setFormValue] = useState({
    leaveType: "All",
    month: "",
  });

  const catagoryhandleSubmit = async () => {
    const { month } = formValue;
    if (formValue) {
      setLoaderView(true);
      setSelectedMonth(month);
      setsubmitDisable(true);
      getData();
    }
  };

  // console.log('setSelectedMonth...........',formValue);

  const goback = () => {
    navigator("/payrollList");
  };

  const [dataFromDatabase, setDataFromDatabase] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formValue.month !== "") {
          const response = await salaryformUpdate(formValue, formValue.month);
          setDataFromDatabase(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formValue.month]);

  const handleChange = (e) => {
    const monthValue = e.target.value;
    setFormValue({
      ...formValue,
      month: monthValue,
    });
    setSelectedMonth(e.target.value);
    setispayrollGenerated(true);
  };

  const fetchTeacherAndDriverData = async () => {
    try {
      if (selectedMonth) {
        const monthName = monthNames[selectedMonth - 1];
        console.log("Selected Month:", monthName);

        const [selectedData, teacherData, driverData] = await Promise.all([
          selectedmonthDisplay(monthName),
          viewTeacher(),
          viewDriver(),
        ]);

        console.log("Selected Month Data:", selectedData);
        console.log("Teacher Data:", teacherData);
        console.log("Driver Data:", driverData);

        if (teacherData.status && driverData.status && selectedData.status) {
          const totalDaysMap = {};
          selectedData.result.forEach((employeeAttendance) => {
            let totalDays = 0;
            employeeAttendance.days.forEach((day) => {
              if (day.status === "Absent" && day.leaveType === "LOP") {
                totalDays++;
              }
            });
            totalDaysMap[employeeAttendance.employeeId] = totalDays;
          });

          const totaldaysformonth = 30;

          console.log("totalDaysMap:", totalDaysMap);

          const teacherResult = teacherData.result.map((teacherItem) => {
            const totalworkingdays =
              totaldaysformonth - (totalDaysMap[teacherItem.teacherId] || 0);
            const salarycalculation =
              teacherItem.grossSalary / totaldaysformonth;
            const netsalary = salarycalculation * (totalworkingdays || 0);
            const Netsalary = Math.round(netsalary / 10) * 10;
            const selectedYear = selectedMonth ? new Date().getFullYear() : "";

            return {
              category: "Teacher",
              employeeId: teacherItem.teacherId,
              name: teacherItem.name,
              currentSalary: teacherItem.currentsalary,
              grossSalary: teacherItem.grossSalary,
              numofDays: totalDaysMap[teacherItem.teacherId] || 0,
              totalworkingdays: totalworkingdays,
              totaldaysformonth,
              Netsalary,
              month: selectedMonth,
              year: selectedYear,
            };
          });

          const driverResult = driverData.result.map((driverItem) => {
            const Netsalary =
              (Math.round(
                (driverItem.grossSalary / totaldaysformonth) * totaldaysformonth
              ) /
                10) *
              10;
            const selectedYear = selectedMonth ? new Date().getFullYear() : "";

            return {
              category: "Driver",
              employeeId: driverItem.driverId,
              name: driverItem.name,
              currentSalary: driverItem.currentsalary,
              grossSalary: driverItem.grossSalary,
              numofDays: 0,
              totalworkingdays: totaldaysformonth,
              totaldaysformonth,
              Netsalary,
              month: selectedMonth,
              year: selectedYear,
            };
          });

          return [...teacherResult, ...driverResult];
        } else {
          return [];
        }
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

  const getData = async () => {
    try {
      if (selectedMonth) {
        let result = [];

        result = await fetchTeacherAndDriverData();

        console.log("fetchTeacherAndDriverData............", result);
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

  const Close = () => {
    window.location.reload();
    setData([]);
    setsubmitDisable(false);
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

  const getMonthName = (monthNumber) => {
    return monthNames[monthNumber - 1];
  };

  const handleSubmit = async () => {
    try {
      const EmployeePaySlip = data.map((item) => ({
        ...item,
        month: getMonthName(item.month),
      }));

      const response = await payrollsalary({ EmployeePaySlip });

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
                value={formValue.month}
                onChange={handleChange}
                disabled={submitDisable}
              >
                <option value="">Select Month</option>
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            {ispayrollGenerated && (
              <div className="middle-header-right">
                <div className="sub-btnn button">
                  <button
                    type="button"
                    onClick={Close}
                    style={{ backgroundColor: "#ff3672" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="header" style={{ marginTop: "-30px" }}>
            <div className="l-header d-flex align-center">
              <p className="m-2 text-dark"> Payrolllist Generate</p>
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
                  <th>Name</th>
                  <th>Month</th>
                  <th>Current Salary</th>
                  <th>Gross Salary</th>
                  <th>Total N.O.D</th>
                  <th>Working Days</th>
                  <th>L.O.P</th>
                  <th>Net Salary</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="sheet-body" key={index + indexOfFirstItem + 1}>
                    <td>{index + indexOfFirstItem + 1}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.name}</td>
                    <td>{`${getMonthName(item.month)}/${item.year}`}</td>
                    <td>{item.currentSalary}</td>
                    <td>{item.grossSalary}</td>
                    <td>{item.totaldaysformonth}</td>
                    <td>{item.totalworkingdays}</td>
                    <td>{item.numofDays}</td>
                    <td>{item.Netsalary || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {ispayrollGenerated && (
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

          {ispayrollGenerated && (
            <button
              className="sheet-button"
              type="button"
              style={{ backgroundColor: "#ff3672" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrolllistGenerate;
