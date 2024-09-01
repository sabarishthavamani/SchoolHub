import React, { useEffect, useState } from "react";
import { leaveDisplay } from "../../actions/adminAction";
import { MdOutlineEdit } from "react-icons/md";

const Attendance = (props) => {
  const { Month } = props;
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const getData = async () => {
    try {
      if (selectedMonth) {
        const [selectedData] = await Promise.all([
          leaveDisplay(selectedMonth), 
        ]);
        setData(selectedData.result);
        console.log("Data:", selectedData.result);
              }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    const currentDate = new Date().getMonth() + 1;
    setSelectedMonth(currentDate.toString());
  }, []);

  useEffect(() => {
    getData(); // Fetch data when the component mounts or selectedMonth changes
  }, [selectedMonth]);

  // Function to get approval color
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

  // Rendered JSX
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
          Total Attendance Status for Month of :{" "}
          <select
            name="Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(2021, month - 1, 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </p>
        <table className="attendance-table" style={{ overflowX: "auto" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>No Of Days</th>
              <th>Reason</th>
              <th>Admin-Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="attendance-table-row" key={index}>
                <td>{index + 1}</td>
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

export default Attendance;
