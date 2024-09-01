import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { leaveApproval, leavesanction } from "../actions/adminAction";
import toastAlert from "../lib/toast";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { green, red, yellow } from "@mui/material/colors";

const initialFormValue = {
  currentDate: "",
  employeeId: "",
  name: "",
  fromDate: "",
  toDate: "",
  numofDays: "",
  reason: "",
  approval: "",
  leaveType: "",
  active: "",
};

const LeaveApproval = ({ id, LeaveDataListId = "" }) => {
    const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentDate, setcurrentDate] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [name, setname] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [numofDays, setnumofDays] = useState("");
  const [reason, setreason] = useState("");
  const [approval, setapproval] = useState("Applied");
  const [leaveType, setleaveType] = useState("");
  const [Id, setId] = useState("");
  const [reasonDecline, setreasonDecline] = useState("");
  // const { LeaveDataListId } = useParams();

  console.log("LeaveDataListId:", LeaveDataListId); // Add this line to log the value

  ///days calculate

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fromDate" || name === "toDate") {
      const parsedDate = new Date(value);
      if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date format:", value);
        return;
      }

      const newFromDate = name === "fromDate" ? value : fromDate;
      const newToDate = name === "toDate" ? value : toDate;

      const from = new Date(newFromDate);
      const to = new Date(newToDate);

      const differenceInDays =
        Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      setfromDate(newFromDate);
      settoDate(newToDate);
      setnumofDays(isNaN(differenceInDays) ? "" : differenceInDays);
    } else if (name === "numofDays") {
      setnumofDays(value);
    } else {
    }
  };

  //////
  const handleApprovalChange = (e) => {
    const { name, value } = e.target;
    if (name === "approval") {
      setapproval(value);
      if (value === "Pending") {
        setreasonDecline("");
      }
    }
  };

  useEffect(() => {
    if (location.state && location.state.leaveData) {
      const leaveData = location.state.leaveData;
      setFormValue(leaveData);
    }
  }, [location.state]);

  useEffect(() => {
    setId(localStorage.getItem("Id") || "");
    setemployeeId(localStorage.getItem("employeeId") || "");
    setname(localStorage.getItem("name") || "");
    setcurrentDate(localStorage.getItem("currentDate") || "");
    setfromDate(localStorage.getItem("fromDate") || "");
    settoDate(localStorage.getItem("toDate") || "");
    setnumofDays(localStorage.getItem("numofDays") || "");
    setreason(localStorage.getItem("reason") || "");
    setapproval(localStorage.getItem("approval") || "");
    setleaveType(localStorage.getItem("leaveType") || "");
    setreasonDecline(localStorage.getItem("reasonDecline") || "");
  }, []);

  useEffect(() => {
    setreasonDecline(localStorage.getItem("reasonDecline") || "");
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.leaveformDislay();
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); 
  
  const handleSubmit = async (e, employeeId, LeaveDataListId) => {
    e.preventDefault();
  
    try {
      const formData = {
        employeeId: employeeId,
        name: name,
        fromDate: fromDate,
        toDate: toDate,
        numofDays: numofDays,
        reason: reason,
        leaveType: leaveType,
        approval: approval,
        reasonDecline:
          approval === "Decline" || approval === "Pending" ? reasonDecline : "",
      };
  
      const { status, message } = await leavesanction(formData, id);
  
      switch (approval) {
        case "Accept":
          toastAlert("success", "Leave Approved", "green");
          break;
        case "Decline":
          toastAlert("error", "Leave Declined", "red");
          break;
        case "Pending":
          toastAlert("pending", "Leave is Pending", "orange");
          break;
        default:
          toastAlert("error", "Something Error", "error");
      }
  
      // setTimeout(() => {
      //   window.location.reload();
      // }, 900);
    } catch (error) {
      console.error("Error updating leave application:", error);
      toastAlert("error", "Failed to update leave application", "red");
    }
  };
  
  

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", dateString);
      return "";
    }
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  //currentDate
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = currentDate.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
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
        <h2>Leave Form</h2>
        <form >
          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="employeeId">Teacher Id</label>
              <input
                type="text"
                name="employeeId"
                value={employeeId}
                onChange={(e) => setemployeeId(e.target.value)}
                disabled
              />
            </div>
            <div className="route-allocate-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                disabled
              />
            </div>
          </div>

          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="fromDate">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formatDate(fromDate)}
                onChange={handleChange}
                min={getCurrentDate()}
                disabled
              />
            </div>
            <div className="route-allocate-input">
              <label htmlFor="toDate">To Date</label>
              <input
                type="date"
                name="toDate"
                value={formatDate(toDate)}
                onChange={handleChange}
                min={formatDate(fromDate)}
                disabled
              />
            </div>
          </div>

          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="numofDays">No Of Days</label>
              <input
                type="text"
                name="numofDays"
                value={numofDays}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="route-allocate-input">
              <label htmlFor="leaveType">Leave Type</label>
              <select
                name="leaveType"
                value={leaveType}
                onChange={(e) => setleaveType(e.target.value)}
                disabled
              >
                <option value=""></option>
                <option value="Casual">Casual</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
            <div className="route-allocate-input">
              <label htmlFor="reason">Reason</label>
              <input
                name="reason"
                value={reason}
                onChange={(e) => setreason(e.target.value)}
                disabled
              />
            </div>
          </div>

          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="approval">Approval</label>
              <select
                name="approval"
                value={approval}
                onChange={handleApprovalChange}
              >
                <option value=""></option>
                <option value="Accept">Approval</option>
                <option value="Pending">Pending</option>
                <option value="Decline">Decline</option>
              </select>
            </div>
            {(approval === "Decline" || approval === "Pending") && (
              <div className="route-allocate-input">
                <label htmlFor="reasonDecline">Reason for Decline</label>
                <input
                  type="text"
                  name="reasonDecline"
                  value={reasonDecline}
                  onChange={(e) => setreasonDecline(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="btnn center">
          <button onClick={(e) => handleSubmit(e, employeeId, LeaveDataListId)}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApproval;
