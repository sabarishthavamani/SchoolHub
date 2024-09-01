import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
//import Actions
import {
  adminnotificationDisplay,
  displayoverall,
  findAttendance,
  leaveAllocateDisplay,
  singleAllocateDisplay,
} from "../actions/adminAction";
import {
  findmarksheetForAnalysis,
  findsection,
} from "../actions/teacherAction";
//import Lib
import toastAlert from "../lib/toast";
//import Components
import TimeTablePopup from "./components/timetablepopup";
import Attendance from "./components/attendance";
import DriverHeader from "./components/driverheader";
import DriverSidebar from "./components/driversidebar";
import Calendar from "react-calendar";
import LeaveFormdriver from "./components/leaveFormdriver";
import AttendanceDriver from "./components/atendance.driver";

const DriverDashboard = () => {
  const [driverId] = useState(JSON.parse(localStorage.getItem("DRIVER_DATA")));
  //states for Attendance view
  const [schedule, setSchedule] = useState("");
  const [currentDaySchedule, setCurrentDaySchedule] = useState([]);
  const [AttendanceView, setAttendanceView] = useState("");
  const [attendancecheck, setattendancecheck] = useState({});

  const DriverId = driverId.driverId;
  const Thismonth = new Date().toLocaleString("en-US", { month: "long" });
  const Today = new Date().toLocaleDateString();
  const [showPopup, setShowPopup] = useState({
    teacherTimetable: false,
    driverAttendance: false,
  });

  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [leaveFormData, setLeaveFormData] = useState({
    employeId: "",
    name: "",
    fromDate: "",
    toDate: "",
    numofDays: "",
    leaveType: "",
    reason: "",
    approval: "",
  });

  const handleLeavePopup = () => {
    setShowLeavePopup(true);
  };

  const closePopup = () => {
    setShowLeavePopup(false);
  };

  const handleLeaveFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveFormData({ ...leaveFormData, [name]: value });
  };

  const handleLeaveFormSubmit = (e) => {
    e.preventDefault();
    console.log("Leave application submitted:", leaveFormData);

    setLeaveFormData({
      employeId: "",
      name: "",
      fromDate: "",
      toDate: "",
      numofDays: "",
      leaveType: "",
      reason: "",
      approval: "",
    });

    setShowLeavePopup(false);
  };

  const [stdAttDetails, setStdAttDetails] = useState({
    admissiongrade: "",
    section: "",
    date: "",
  });

  const { admissiongrade, section, date } = stdAttDetails;
  //consolidate timetable popup
  const handleTimetablePopup = () => {
    setShowPopup((prev) => ({
      ...prev,
      teacherTimetable: true,
    }));
  };

  useEffect(() => {
    // Process the schedule data when it changes
    if (schedule && schedule.schedule) {
      const processedData = schedule.schedule.map((dayData) => {
        const { day, periods } = dayData;
        const processedPeriods = Object.values(periods).filter(
          (period) => period.class && period.subject
        );
        return { day, periods: processedPeriods };
      });
      // Get the current day
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      // Filter the processed schedule for the current day
      const currentDayData = processedData.find(
        (dayData) => dayData.day.toLowerCase() === today.toLowerCase()
      );
      setCurrentDaySchedule(currentDayData || []);
    }
  }, [schedule]);
  //student Attendance data
  const getAttendance = async () => {
    try {
      const attendata = {
        date: Today,
      };
      let { status, result } = await findAttendance(attendata);
      if (status === true) {
        setAttendanceView(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const IndividualAttendanceView =
    AttendanceView && AttendanceView.attendance && AttendanceView.attendance
      ? AttendanceView.attendance.find((each) => DriverId === each.driverId)
      : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStdAttDetails({ ...stdAttDetails, [name]: value });
  };
  const getStuendentAttendance = async () => {
    try {
      let Data = {
        admissiongrade: admissiongrade,
        section: section,
        date: date,
      };
      let { status, message, result2 } = await findsection(Data);
      if (status === true) {
        setattendancecheck(result2);
      }
      if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const attendanceArray = attendancecheck && attendancecheck.attendance;
  let presentCount = 0;
  let absentCount = 0;

  attendanceArray &&
    attendanceArray.forEach((student) => {
      if (student.status === "present") {
        presentCount++;
      } else if (student.status === "absent") {
        absentCount++;
      }
    });

  //consolidate attendance popup
  const handleAttendancePopup = () => {
    setShowPopup((prev) => ({
      ...prev,
      driverAttendance: true,
    }));
  };

  //state for Marksheet Analysis
  const [markData, setMarkData] = useState([]);
  const [graphData, setGraphData] = useState([
    { name: "High Distinction", value: 1, colors: "#63CD81" },
    { name: "Average", value: 1, colors: "#5BC7E6" },
    { name: "Below Average", value: 1, colors: "#7963CD" },
    { name: "Fail", value: 1, colors: "#EE0B0B" },
  ]);

  const [leaveData, setleaveData] = useState([
    { name: "High Distinctioxfvfvdfn", value: 1, colors: "#63CD81" },
    { name: "Average", value: 1, colors: "#5BC7E6" },
    { name: "Below Average", value: 1, colors: "#7963CD" },
    { name: "Fail", value: 1, colors: "#EE0B0B" },
  ]);
  const [graphErr, setGraphErr] = useState(false);
  const [totalPercent, setTotalPercent] = useState({
    totalPassPercent: "",
    highDistinctionPercent: "",
    averagePercent: "",
    belowAveragePercent: "",
    failPercent: "",
  });
  //state for marks data
  const [stdMarkDetails, setStdMarkDetails] = useState({
    admissiongrade: "",
    section: "",
    test: "quarterly",
  });
  // marksheet data

  //Leave Allocation
  const [leaveAllocate, setleaveAllocate] = useState([]);

  const displayTotalLeave = async (empID) => {
    try {
      const response = await singleAllocateDisplay(empID);
      const data = response;
      console.log(response, "dtkjskk");
      if (data.status === true) {
        setleaveAllocate(data.result);
        console.log(leaveAllocate, "getsingleallocate...");
      } else {
        toastAlert("error", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const empID = JSON.parse(localStorage.getItem("DRIVER_DATA")).driverId;
    displayTotalLeave(empID);
  }, []);

  //calendar

  const [dates, setDates] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const { status, result } = await displayoverall();
        if (status && Array.isArray(result)) {
          const driverData = JSON.parse(localStorage.getItem("DRIVER_DATA"));
          const driverId = driverData ? driverData.driverId : "";
          const employeeAttendance = result.filter(
            (entry) => entry.employeeId === driverId
          );
          setAttendanceData(employeeAttendance);
          console.log("Employee Attendance:", employeeAttendance);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendanceData();
  }, []);

  const tileContent = ({ date }) => {
    const currentDate = new Date();

    // Skip rendering for Sundays
    if (date.getDay() === 0) {
      return null;
    }

    if (currentDate <= date) {
      return null;
    }

    const day = String(date.getDate()).padStart(1, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = String(date.getFullYear());

    const formattedDate = `${day} ${month} ${year}`;
    console.log("Formatted Date:", formattedDate);

    const attendanceForDate = attendanceData.find((entry) =>
      entry.days.some((day) => day.date === formattedDate)
    );
    console.log("attendanceForDate", attendanceForDate);

    if (attendanceForDate) {
      const hasPresent = attendanceForDate.days.some(
        (dayData) =>
          dayData.date === formattedDate && dayData.status === "Present"
      );
      const hasAbsent = attendanceForDate.days.some(
        (dayData) =>
          dayData.date === formattedDate && dayData.status === "Absent"
      );
      const hasHoliday = attendanceForDate.days.some(
        (dayData) =>
          dayData.date === formattedDate && dayData.status === "Holiday"
      );

      if (hasPresent && hasAbsent) {
        return (
          <div style={{ color: "orange", fontWeight: "bold" }}>
            Both P and A
          </div>
        );
      } else if (hasPresent) {
        return <div style={{ color: "green", fontWeight: "bold" }}>P</div>;
      } else if (hasAbsent) {
        return <div style={{ color: "red", fontWeight: "bold" }}>A</div>;
      } else if (hasHoliday) {
        return <div style={{ color: "Orange", fontWeight: "bold" }}>H</div>;
      }
    }
    return null;
  };

  // Notification

  const [data, setData] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState("");

  const fetchData = async () => {
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.toLocaleString("default", { month: "short" });
      const year = formattedDate.getFullYear();
      return `${day} ${month} ${year}`;
    };

    const schedularcurrentDate = formatDate(new Date());
    console.log("Current Date:", schedularcurrentDate);

    try {
      const { status, result, imageUrl } = await adminnotificationDisplay();
      console.log("Date in result:", result);

      if (status) {
        const filteredResult = result.filter(
          (item) => formatDate(item.date) === schedularcurrentDate
        );

        console.log("Filtered result:", filteredResult);

        setIMAGE_URL(imageUrl);
        setData(filteredResult);

        if (filteredResult.length === 0) {
          console.log("There are no values today");
        }
      } else {
        console.log("Error fetching data:", result);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-page">
      <DriverHeader />
      <div className="dashboard-main">
        {showPopup.teacherTimetable && (
          <div className="teacher-schedule-pop">
            <div
              className="schedule-pop-overlay"
              onClick={() =>
                setShowPopup((prev) => ({ ...prev, teacherTimetable: false }))
              }
            ></div>
            <div className="schedule-pop-container">
              <TimeTablePopup data={schedule.schedule} />
            </div>
          </div>
        )}
        {showPopup.driverAttendance && (
          <div className="teacher-schedule-pop">
            <div
              className="schedule-pop-overlay"
              onClick={() =>
                setShowPopup((prev) => ({ ...prev, driverAttendance: false }))
              }
            ></div>
            <div className="schedule-pop-container">
              <AttendanceDriver DriverId={DriverId} Month={Thismonth} />
            </div>
          </div>
        )}

        {showLeavePopup && (
          <div className="teacher-schedule-pop">
            <div
              className="schedule-pop-overlay"
              onClick={() => setShowLeavePopup(false)}
            >
              {" "}
            </div>

            <div className="schedule-pop-container">
              <LeaveFormdriver
                closePopup={closePopup}
                formData={leaveFormData}
                onChange={handleLeaveFormChange}
                onSubmit={handleLeaveFormSubmit}
              />
            </div>
          </div>
        )}

        <DriverSidebar />
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h2 className="dashboard-title">Driver Dashboard</h2>
            <div
              className="dashboard-segments"
              style={{
                height: "400px",
                overflowY: "auto",
                marginBottom: "10px",
                animation: data.length > 0 ? "blinkBlue 1s infinite" : "none",
              }}
            >
              <div className="dashboard-segment-content">
                <div className="tchr-att-header">
                  <h2 style={{ color: "lightgreen" }}>CIRCULAR</h2>
                  <div className="dashboard-segment-content"></div>
                  {data.length === 0 && (
                    <p
                      className="dashboard-reminder"
                      style={{ textAlign: "center" }}
                    >
                      <h1>No circular today</h1>
                    </p>
                  )}
                  {data.map((item, index) => (
                    <div className="dashboard-reminder" key={index}>
                      <ul>
                        <tr>
                          <h4>{item.title}</h4>
                        </tr>
                        <tr style={{ textAlign: "center" }}>
                          <div
                            style={{
                              width: "100px",
                              height: "100px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${IMAGE_URL}/${item.photo}`}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </tr>
                        <tr style={{ textAlign: "left" }}>{item.command}</tr>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="dashboard-tchr-info">
              <div className="dashboard-segments">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>My Attendance Status</p>
                    {/* <button
                      type="button"
                      onClick={handleAttendancePopup}
                      className="tchr-month-att-btn"
                    >
                      <MdOutlineRemoveRedEye />
                      Monthly Attendance
                    </button> */}
                  </div>
                  <div className="react-calender">
                    <Calendar
                      onChange={setDates}
                      value={dates}
                      showNeighboringMonth={false}
                      locale="en-US"
                      tileContent={tileContent}
                    />
                  </div>
                </div>
              </div>
              <div className="dashboard-segments">
                <div className="dashboard-segment-content">
                  {/* <div className="tchr-att-header">
                    <p>
                      {" "}
                      <button
                        type="button"
                        onClick={handleAttendancePopup}
                        className="tchr-month-att-btn"
                      >
                        <MdOutlineRemoveRedEye />
                        Leave Status
                      </button>
                    </p>
                  </div> */}
                  <div
                    className="dashboard-segments stud-mark-analyze-sm"
                    style={{ height: "510%" }}
                  >
                    <div className="dashboard-segment-content">
                      <div className="tchr-att-header">
                        <p>Leave Allocation Details</p>
                        <button
                          type="button"
                          onClick={handleLeavePopup}
                          className="tchr-month-att-btn"
                        >
                          <MdOutlineRemoveRedEye />
                          Apply Leave
                        </button>
                      </div>
                      <div
                        className="stud-mark-analyze"
                        style={{ marginTop: "10%", marginLeft: "-8%" }}
                      >
                        <div className="stud-mark-analyze-chart">
                          <div className="stud-mark-scale">
                            <ul>
                              <li>
                                <span></span>
                                {totalPercent.highDistinctionPercent && (
                                  <p>{`${totalPercent.highDistinctionPercent}%`}</p>
                                )}
                                {leaveAllocate && (
                                  <p>
                                    Medical Leave - {leaveAllocate.medicalLeave}
                                  </p>
                                )}
                              </li>
                              <li>
                                <span
                                  style={{ backgroundColor: "#5BC7E6" }}
                                ></span>
                                {totalPercent.averagePercent && (
                                  <p>{`${totalPercent.averagePercent}%`}</p>
                                )}
                                {leaveAllocate && (
                                  <p>
                                    Casual Leave - {leaveAllocate.casualLeave}
                                  </p>
                                )}
                              </li>
                              <li>
                                <span
                                  style={{ backgroundColor: "#7963CD" }}
                                ></span>
                                {totalPercent.belowAveragePercent && (
                                  <p>{`${totalPercent.belowAveragePercent}%`}</p>
                                )}
                                {leaveAllocate && (
                                  <p>
                                    Paternity Leave -{" "}
                                    {leaveAllocate.paternityLeave}
                                  </p>
                                )}
                              </li>
                              <li>
                                <span
                                  style={{ backgroundColor: "#ed8b09" }}
                                ></span>
                                {totalPercent.failPercent && (
                                  <p>{`${totalPercent.failPercent}%`}</p>
                                )}
                                {leaveAllocate && (
                                  <p>LOP - {leaveAllocate.unpaidLeave}</p>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="stud-mark-analyze-percent">
                            <span>Total Leave</span>
                            {leaveAllocate && (
                              <p>{leaveAllocate.annualLeave} Days</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
