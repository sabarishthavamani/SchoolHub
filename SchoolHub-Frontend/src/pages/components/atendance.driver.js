import React, { useEffect, useState } from "react";
import {
    findAttendanceForMonth,
  leaveDisplay,
} from "../../actions/adminAction";
import { MdOutlineEdit } from "react-icons/md";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const AttendanceDriver = (props) => {
  const { DriverId, Month } = props;

  const [monthData, setMonthData] = useState([]);

  const getMonthData = async () => {
    try {
      const MonthData = {
        month: Month,
      };
      let { status, result } = await findAttendanceForMonth(MonthData);
      console.log("Status:", status);
      console.log("Result:", result);
      if (status === true) {
        setMonthData(result);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getMonthData();
  }, []);
  console.log(monthData, "---mmmmdata");

  //New values
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState({
    approvalPage: false,
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const getData = async () => {
    try {
      let { status, result } = await leaveDisplay();

      if (status) {
        const driverData = JSON.parse(localStorage.getItem("DRIVER_DATA"));
        const driverId = driverData ? driverData.driverId : "";
        const driverLeaveData = result.filter(
          (leave) => leave.employeeId === driverId && leave.active === 1
        );
        setLoaderView(false);
        setData(driverLeaveData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const editVehicle = (data) => {
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

  useEffect(() => {
    const currentDate = new Date().getMonth() + 1;
    setSelectedMonth(currentDate.toString());
  }, []);

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

  const filterDataByMonth = (month) => {
    setSelectedMonth(month);
  };

  const filteredData = selectedMonth
    ? data.filter(
        (item) =>
          new Date(item.fromDate).getMonth() + 1 === Number(selectedMonth)
      )
    : [];

  const closepopup = () => {
    setShowPopup(false);
  };

  return (
    <div
    className="teacher-attendance"
    style={{
        boxShadow: "1px 3px 10px 4px #00000040",
        background: "rgb(247, 247, 248)",
      }}
    >
      <div className="monthly-content">
        <p className="monthlypara">
          Total AttendanceDriver Status for Month of :{" "}
          <select
            name="Month"
            onChange={(e) => filterDataByMonth(e.target.value)}
            value={selectedMonth}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </p>
        <table className="attendance-table" style={{ overflowX: "auto" }}>
          <tr>
            <th>S.No</th>
            {/* <th>Applied Date</th> */}
            <th>From Date</th>
            <th>To Date</th>
            <th>No Of Days</th>
            <th>Reason</th>
            <th>Admin-Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tbody>
            {filteredData.map((item, index) => (
              <tr className="attendance-table-row" key={item.id}>
              <td>{index + 1}</td>
                {/* <td style={{ color: "greenyellow" }}>{item.currentDate}</td> */}
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td>{item.numofDays}</td>
                <td>{item.reason}</td>
                <td>{item.reasonDecline}</td>
                <td>
                  <span
                    className="due2"
                    style={{
                      color: getApprovalColor(item.approval),
                    }}
                  >
                    {item.approval}
                  </span>
                </td>
                <td>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ color: "blue" }}
                    onClick={() => editVehicle(item)}
                  >
                    <MdOutlineEdit />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AttendanceDriver;
