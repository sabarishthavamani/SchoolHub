import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import {
  payrollListmonth,
  salaryformUpdate,
  salarypayrollDislay,
} from "../actions/adminAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import toastAlert from "../lib/toast";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const initialFormValue = {
  month: "",
  currentSalary: "",
  Netsalary: "",
};

const PayrollList = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [isPayrollGenerated, setIsPayrollGenerated] = useState(false);
  const [monthStoredDatas, setMonthStoredDatas] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    if (selectedMonth && showDetails) {
      getData();
    }
  }, [selectedMonth, showDetails]);

  const PayrollListGenerate = () => {
    navigator("/PayrollListGenerate");
  };

  const getData = async () => {
    try {
      if (selectedMonth) {
        const selectedData = await salarypayrollDislay(selectedMonth);
        const teacherDisplay = selectedData.result;
        setData(teacherDisplay);
        setFilteredData(teacherDisplay); // Initialize filteredData with fetched data
        console.log("Filtered Data:", teacherDisplay);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  const catagoryHandleSubmit = async () => {
    if (selectedMonth) {
      setShowDetails(true);
      setSubmitDisable(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const monthList = async () => {
    try {
      const listView = await payrollListmonth();
      const valuesAreVisible = listView.result;
      setMonthStoredDatas(valuesAreVisible);
    } catch (error) {
      console.error("Error fetching month data:", error);
    }
  };

  useEffect(() => {
    monthList();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setIsPayrollGenerated(true);
  };

  const handleValuesUpdate = (e, itemId, field) => {
    const { value } = e.target;
    const updatedData = data.map((item) =>
      item.employeeId === itemId ? { ...item, [field]: value } : item
    );

    const totalDaysMap = {};
    updatedData.forEach((item) => {
      totalDaysMap[item.employeeId] = 30 - item.numofDays;
    });

    updatedData.forEach((item) => {
      const totalWorkingDays = totalDaysMap[item.employeeId] || 0;
      const salaryAdding = parseInt(item.grossSalary) / 30;
      const calculation = totalWorkingDays * salaryAdding;
      const NetSalary = Math.round(calculation / 10) * 10;
      item.Netsalary = NetSalary;
      item.totalworkingdays = totalWorkingDays;
    });

    setData(updatedData);
    setFilteredData(updatedData); // Update filteredData when data changes

    if (editingItemId === itemId) {
      setFormValue({ ...formValue, [field]: value });
    }
  };

  const handleEditSubmit = async (employeeId, employeePaySlipId) => {
    try {
      const updatedItem = data.find((item) => item.employeeId === employeeId);
      if (!updatedItem) return;

      const formData = {
        employeeId: employeeId,
        currentSalary: formValue.currentSalary,
        grossSalary: formValue.grossSalary,
        numofDays: updatedItem.numofDays,
        totalworkingdays: updatedItem.totalworkingdays,
        Netsalary: updatedItem.Netsalary,
      };

      const { status, message } = await salaryformUpdate(
        formData,
        employeePaySlipId,
        employeeId
      );

      if (status === "success") {
        toastAlert("success", "Salary updated successfully", "green");
        getData();
      } else {
        toastAlert("error", message, "red");
      }
    } catch (error) {
      console.error("Error updating salary:", error);
      toastAlert("error", "Failed to update salary", "red");
    }
    setEditingItemId(null);
  };

  const Close = () => {
    window.location.reload();
  };

  const exportToExcel = () => {
    try {
      const totalCurrentSalary = data.reduce(
        (total, item) => total + parseFloat(item.currentSalary),
        0
      );
      const formattedTotalCurrentSalary = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(totalCurrentSalary);

      const totalGrossSalary = data.reduce(
        (total, item) => total + parseFloat(item.grossSalary),
        0
      );
      const formattedTotalGrossSalary = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(totalGrossSalary);

      const NetSalary = data.reduce(
        (total, item) => total + parseFloat(item.Netsalary),
        0
      );
      const formattedTotalNetSalary = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(NetSalary);

      const modifiedData = [
        ...data.map((item) => ({
          "Employee ID": item.employeeId,
          "Employee Name": item.name,
          Month: `${item.month}/${item.year}`,
          "Current Salary": new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(item.currentSalary),
          "Gross Salary": new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(item.grossSalary),
          "Total N.O.D": item.totaldaysformonth,
          "Working Days": item.totalworkingdays,
          "L.O.P": item.numofDays,
          "Net Salary": item.Netsalary || "-",
        })),
        {
          "Employee ID": "Total",
          "Employee Name": "",
          Month: "",
          "Current Salary": formattedTotalCurrentSalary,
          "Gross Salary": formattedTotalGrossSalary,
          "Total N.O.D": "",
          "Working Days": "",
          "L.O.P": "",
          "Net Salary": formattedTotalNetSalary,
        },
      ];
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Payroll Data");

      XLSX.writeFile(wb, "payroll_data.xlsx");
      window.location.reload();
      toastAlert("success", "Downloaded Successfully.");
    } catch (error) {
      console.error("Error occurred while exporting data to Excel:", error);
      toastAlert("error", "Failed to export data to Excel.");
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
                onClick={catagoryHandleSubmit}
              >
                <option value="">Select Month</option>
                {monthStoredDatas.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            {isPayrollGenerated && (
              <div className="middle-header-right">
              <div className="sub-btnn button">
                <button
                  type="button"
                  style={{ backgroundColor: "#ff3672" }}
                  onClick={Close}
                >
                  Close
                </button>
              </div>
            </div>
          )}
                    </div>

          <div className="header" style={{ marginTop: "-30px" }}>
            <div className="l-header d-flex align-center">
              <p className="m-2 text-dark"> Pay Roll</p>
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

          <div className="att-record" style={{ marginTop: "10px" }}>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="sheet-body" key={index + indexOfFirstItem + 1}>
                    <td>{index + indexOfFirstItem + 1}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.name}</td>
                    <td>{`${item.month}/${item.year}`}</td>
                    <td>{item.currentSalary}</td>
                    <td>{item.grossSalary}</td>
                    <td>{item.totaldaysformonth}</td>
                    <td>{item.totalworkingdays}</td>

                    <td>
                      {editingItemId === item.employeeId ? (
                        <input
                          type="text"
                          value={item.numofDays}
                          onChange={(e) =>
                            handleValuesUpdate(e, item.employeeId, "numofDays")
                          }
                        />
                      ) : (
                        item.numofDays
                      )}
                    </td>
                    <td>{item.Netsalary}</td>
                    <td>
                      {editingItemId === item.employeeId ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            onClick={() =>
                              handleEditSubmit(item.employeeId, item._id)
                            }
                            style={{ cursor: "pointer", marginRight: "5px" }}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={handleCancelEdit}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      ) : (
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => setEditingItemId(item.employeeId)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isPayrollGenerated && (
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

         

{isPayrollGenerated && (
  <div className="sub-btnn button" style={{marginBottom:"50px"}}>
      <button
                // className="sheet-button"
                type="button"
                onClick={exportToExcel}
                style={{ backgroundColor: "#ff3672" }}
              >
                Export to Excel
              </button>
    </div>

            
            )}

        </div>
      </div>
    </div>
  );
};

export default PayrollList;
