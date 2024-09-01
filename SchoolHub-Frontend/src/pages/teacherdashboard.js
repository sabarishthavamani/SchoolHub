import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  FaCheckCircle,
  FaPercent,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import {
  MdOutlineRemoveRedEye,
  MdOutlineClass,
  MdOutlineToday,
} from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
//import Actions
import {
  adminnotificationDisplay,
  displayBusAllocation,
  displayoverall,
  findAttendance,
  getAllVehicle,
  getfixedschedule,
  leaveAllocateDisplay,
  leaveAllocateEdit,
  singleAllocateDisplay,
  viewDriver,
} from "../actions/adminAction";
import {
  findmarksheetForAnalysis,
  findsection,
} from "../actions/teacherAction";
//import Lib
import toastAlert from "../lib/toast";
//import Components
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";
import ProgressChart from "./components/progresschart";
import TimeTablePopup from "./components/timetablepopup";
import Attendance from "./components/attendance";
import LeaveForm from "./components/leaveForm";
import Calendar from "react-calendar";

const TeacherDashboard = () => {
  const [teacherId] = useState(
    JSON.parse(localStorage.getItem("TEACHER_DATA"))
  );
  //states for Attendance view
  const [schedule, setSchedule] = useState("");
  const [currentDaySchedule, setCurrentDaySchedule] = useState([]);
  const [AttendanceView, setAttendanceView] = useState("");
  const [attendancecheck, setattendancecheck] = useState({});

  const TeacherId = teacherId.teacherId;
  const Thismonth = new Date().toLocaleString("en-US", { month: "long" });
  const Today = new Date().toLocaleDateString();
  const [showPopup, setShowPopup] = useState({
    teacherTimetable: false,
    teacherAttendance: false,
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
  //consolidate attendance popup
  const handleAttendancePopup = () => {
    setShowPopup((prev) => ({
      ...prev,
      teacherAttendance: true,
    }));
  };
  //teacher Attendance data
  const getSchedule = async () => {
    try {
      const Scheduledata = {
        teacherId: TeacherId,
      };
      console.log(Scheduledata, "---sch");
      let { status, result, result2 } = await getfixedschedule(Scheduledata);
      console.log(result2, "---result2");
      if (status == true) {
        setSchedule(result);
      }
    } catch (err) {
      console.log(err, "---err");
    }
  };
  useEffect(() => {
    getSchedule();
  }, [TeacherId]);

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
  //teacher Attendance data
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
      ? AttendanceView.attendance.find((each) => TeacherId === each.teacherId)
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
    attendanceArray.forEach((teacher) => {
      if (teacher.status === "present") {
        presentCount++;
      } else if (teacher.status === "absent") {
        absentCount++;
      }
    });

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
  const handleMarksubmit = async () => {
    try {
      const Data = {
        admissiongrade: stdMarkDetails.admissiongrade,
        section: stdMarkDetails.section,
      };
      let { status, result, message } = await findmarksheetForAnalysis(Data);
      if (status === true) {
        setMarkData(result);
      }
      if (status === false) {
        toastAlert("errors", message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //leave
  const [leaveAllocate, setleaveAllocate] = useState([]);

  const displayTotalLeave = async (empID) => {
    try {
      const response = await singleAllocateDisplay(empID);
      const data = response;
      console.log(response, "dtkjskk");
      if (data.status === true) {
        setleaveAllocate(data.result);
      } else {
        toastAlert("error", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(leaveAllocate, "getsingleallocate...");

  useEffect(() => {
    const empID = JSON.parse(localStorage.getItem("TEACHER_DATA")).teacherId;
    displayTotalLeave(empID);
  }, []);

  const handleNavChange = (examType) => {
    const updatedMarkData = [
      { name: "High Distinction", value: 0, colors: "#63CD81" },
      { name: "Average", value: 0, colors: "#5BC7E6" },
      { name: "Below Average", value: 0, colors: "#7963CD" },
      { name: "Fail", value: 0, colors: "#EE0B0B" },
    ];
    const selectedExam = markData.filter((item) => item.exam === examType);

    if (selectedExam.length !== 0) {
      const passedteacher = (total) => {
        const totalPercent = (total / 500) * 100;
        if (totalPercent >= 90) {
          updatedMarkData[0].value += 1;
        } else if (totalPercent >= 70 && totalPercent < 90) {
          updatedMarkData[1].value += 1;
        } else if (totalPercent >= 35 && totalPercent < 70) {
          updatedMarkData[2].value += 1;
        }
      };

      const failedteacher = (total) => {
        updatedMarkData[3].value += 1;
      };

      selectedExam[0].marks.forEach((teacher) => {
        const subjectObjKey = Object.keys(teacher.subjects);
        const isteacherPass = subjectObjKey.every(
          (each) => parseInt(teacher.subjects[each]) >= 35
        );
        if (isteacherPass) {
          passedteacher(teacher.total);
        } else {
          failedteacher(teacher.total);
        }
      });

      const totalPassPercent = Math.round(
        (updatedMarkData.reduce(
          (acc, each) => (each.name !== "Fail" ? each.value + acc : acc),
          0
        ) /
          selectedExam[0].marks.length) *
          100
      );
      const highDistinctionPercent = Math.round(
        (updatedMarkData[0].value / selectedExam[0].marks.length) * 100
      );
      const averagePercent = Math.round(
        (updatedMarkData[1].value / selectedExam[0].marks.length) * 100
      );
      const belowAveragePercent = Math.round(
        (updatedMarkData[2].value / selectedExam[0].marks.length) * 100
      );
      const failPercent = 100 - totalPassPercent;

      const updatedTotalMarkPercent = {
        totalPassPercent,
        highDistinctionPercent,
        averagePercent,
        belowAveragePercent,
        failPercent,
      };
      setStdMarkDetails((prev) => ({ ...prev, test: examType }));
      setGraphErr(false);
      setGraphData(updatedMarkData);
      setTotalPercent(updatedTotalMarkPercent);
    } else {
      setStdMarkDetails((prev) => ({ ...prev, test: examType }));
      setGraphErr(true);
      setGraphData([
        { name: "High Distinction", value: 1, colors: "#63CD81" },
        { name: "Average", value: 1, colors: "#5BC7E6" },
        { name: "Below Average", value: 1, colors: "#7963CD" },
        { name: "Fail", value: 1, colors: "#EE0B0B" },
      ]);
      setTotalPercent({
        totalPassPercent: "",
        highDistinctionPercent: "",
        averagePercent: "",
        belowAveragePercent: "",
        failPercent: "",
      });
    }
  };

  //calendar

  const [dates, setDates] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const { status, result } = await displayoverall();
        if (status && Array.isArray(result)) {
          const teacherData = JSON.parse(localStorage.getItem("TEACHER_DATA"));
          const teacherId = teacherData ? teacherData.teacherId : "";
          const employeeAttendance = result.filter(
            (entry) => entry.employeeId === teacherId
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
    const month = date.toLocaleString('default', { month: 'long' });
    const year = String(date.getFullYear());
    
    const formattedDate = `${day} ${month} ${year}`;
    console.log('Formatted Date:', formattedDate);
  
    const attendanceForDate = attendanceData.find((entry) =>
      entry.days.some((day) => day.date === formattedDate)
    );
    console.log("attendanceForDate", attendanceForDate);
  
    if (attendanceForDate) {
      const hasPresent = attendanceForDate.days.some(
        (dayData) => dayData.date === formattedDate && dayData.status === "Present" 
      );
      const hasAbsent = attendanceForDate.days.some(
        (dayData) => dayData.date === formattedDate && dayData.status === "Absent"
      );
      const hasHoliday = attendanceForDate.days.some(
        (dayData) => dayData.date === formattedDate && dayData.status === "Holiday"
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
      <TeacherHeader />
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
        {showPopup.teacherAttendance && (
          <div className="teacher-schedule-pop">
            <div
              className="schedule-pop-overlay"
              onClick={() =>
                setShowPopup((prev) => ({ ...prev, teacherAttendance: false }))
              }
            ></div>
            <div className="schedule-pop-container">
              <Attendance TeacherId={TeacherId} Month={Thismonth} />
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
              <LeaveForm
                closePopup={closePopup}
                formData={leaveFormData}
                onChange={handleLeaveFormChange}
                onSubmit={handleLeaveFormSubmit}
              />
            </div>
          </div>
        )}

        <TeacherSidebar />
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h2 className="dashboard-title">Teacher Dashboard</h2>
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
                    <p>My Attendance</p>
                  </div>
                  <div  >
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

            <div className="dashboard-segments">
              <div className="dashboard-segment-content">
                <div className="tchr-att-header">
                  <p>Schedule</p>
                  <div className="header-input-fields">
                    {currentDaySchedule && currentDaySchedule ? (
                      <span>Day:{currentDaySchedule.day}</span>
                    ) : (
                      <span>Day:Sunday</span>
                    )}
                  </div>
                </div>
                <div className="tchr-schedule-status">
                  {currentDaySchedule && currentDaySchedule ? (
                    currentDaySchedule.periods &&
                    currentDaySchedule.periods.length > 0 ? (
                      <ul>
                        {currentDaySchedule.periods.map(
                          (period, periodIndex) => (
                            <li key={periodIndex}>
                              {`${period.class} ${period.section} - ${period.subject}`}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <ul>
                        <li>Free Period</li>
                        <li>Free Period</li>
                        <li>Free Period</li>
                      </ul>
                    )
                  ) : (
                    <ul>
                      <li>It's Holiday Buddy..!</li>
                      <li>It's Holiday Buddy..!</li>
                      <li>It's Holiday Buddy..!</li>
                    </ul>
                  )}
                  <button type="button" onClick={handleTimetablePopup}>
                    <MdOutlineRemoveRedEye />
                    View Time Table
                  </button>
                </div>
              </div>
            </div>

            <div className="dashboard-stud-info">
              <div className="dashboard-stud-att">
                <div className="dashboard-segments">
                  <div className="dashboard-segment-content">
                    <div className="tchr-att-header">
                      <p>teacher Attendance</p>
                      <div className="header-input-fields">
                        <div className="dashboard-multi-select">
                          <MdOutlineClass />
                          <select
                            style={{ width: "90px" }}
                            value={admissiongrade}
                            name="admissiongrade"
                            onChange={handleChange}
                          >
                            <option></option>
                            <option>Preschool</option>
                            <option>LKG</option>
                            <option>UKG</option>
                            <option>Class 1</option>
                            <option>Class 2</option>
                            <option>Class 3</option>
                            <option>Class 4</option>
                            <option>Class 5</option>
                            <option>Class 6</option>
                            <option>Class 7</option>
                            <option>Class 8</option>
                            <option>Class 9</option>
                            <option>Class 10</option>
                            <option>Class 11</option>
                            <option>Class 12</option>
                          </select>
                        </div>
                        <div className="dashboard-multi-select">
                          <SiGoogleclassroom />
                          <select
                            value={section}
                            name="section"
                            onChange={handleChange}
                          >
                            <option></option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                          </select>
                        </div>
                        <div className="date-field-container">
                          <MdOutlineToday />
                          <input
                            type="date"
                            value={date}
                            name="date"
                            onChange={handleChange}
                          />
                          <span>
                            <button type="button">
                              <RiArrowDropDownLine />
                            </button>
                          </span>
                        </div>
                        <button
                          className="input-trigger-btn"
                          type="button"
                          onClick={getStuendentAttendance}
                        >
                          <FaRegArrowAltCircleRight />
                        </button>
                      </div>
                    </div>
                    <div className="stud-att-status">
                      <div className="att-status-container">
                        <div className="att-status-container-head">
                          <p>{presentCount}</p>
                          <span className="att-status-present">P</span>
                        </div>
                        <div className="att-status-container-foot">
                          <span className="att-status-container-present">
                            <FaArrowTrendUp />
                          </span>
                          <p>Present</p>
                        </div>
                      </div>
                      <div className="att-status-container">
                        <div className="att-status-container-head">
                          <p>{absentCount}</p>
                          <span className="att-status-absent">A</span>
                        </div>
                        <div className="att-status-container-foot">
                          <span className="att-status-container-absent">
                            <FaArrowTrendDown />
                          </span>
                          <p>Absent</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-segments">
                  <div className="dashboard-segment-content">
                    <div className="tchr-att-header">
                      <p>Reminders</p>
                    </div>
                    <div className="dashboard-reminder">
                      <ul>
                        <li>
                          <p>5 Jan, 2024</p>
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod
                            <hr />
                          </div>
                        </li>
                        <li>
                          <p style={{ background: "#FBD540" }}>5 Jan, 2024</p>
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod
                            <hr />
                          </div>
                        </li>
                        <li>
                          <p style={{ background: "#F939A1" }}>5 Jan, 2024</p>
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod
                            <hr />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-segments stud-mark-analyze-sm">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>teacher Marksheet Analysis</p>
                    <div className="header-input-fields">
                      <div className="dashboard-multi-select">
                        <MdOutlineClass />
                        <select
                          value={stdMarkDetails.admissiongrade}
                          name="admissiongrade"
                          onChange={(e) =>
                            setStdMarkDetails((prev) => ({
                              ...prev,
                              admissiongrade: e.target.value,
                            }))
                          }
                        >
                          <option></option>
                          <option>Preschool</option>
                          <option>LKG</option>
                          <option>UKG</option>
                          <option>Class 1</option>
                          <option>Class 2</option>
                          <option>Class 3</option>
                          <option>Class 4</option>
                          <option>Class 5</option>
                          <option>Class 6</option>
                          <option>Class 7</option>
                          <option>Class 8</option>
                          <option>Class 9</option>
                          <option>Class 10</option>
                          <option>Class 11</option>
                          <option>Class 12</option>
                        </select>
                      </div>
                      <div className="dashboard-multi-select">
                        <SiGoogleclassroom />
                        <select
                          value={stdMarkDetails.section}
                          name="section"
                          onChange={(e) =>
                            setStdMarkDetails((prev) => ({
                              ...prev,
                              section: e.target.value,
                            }))
                          }
                        >
                          <option></option>
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                          <option>D</option>
                          <option>E</option>
                          <option>F</option>
                        </select>
                      </div>
                      <button
                        className="input-trigger-btn"
                        type="button"
                        onClick={handleMarksubmit}
                      >
                        <FaRegArrowAltCircleRight />
                      </button>
                    </div>
                  </div>
                  <div className="stud-mark-analyze">
                    <div className="stud-mark-analyze-nav">
                      <span
                        className={
                          stdMarkDetails.test === "Quarterly"
                            ? "selected"
                            : null
                        }
                        onClick={() => handleNavChange("Quarterly")}
                      >
                        Quarterly
                      </span>
                      <span
                        className={
                          stdMarkDetails.test === "Halfyearly"
                            ? "selected"
                            : null
                        }
                        onClick={() => handleNavChange("Halfyearly")}
                      >
                        Half- Yearly
                      </span>
                      <span
                        className={
                          stdMarkDetails.test === "Annual" ? "selected" : null
                        }
                        onClick={() => handleNavChange("Annual")}
                      >
                        Annual
                      </span>
                    </div>
                    <div className="stud-mark-analyze-chart">
                      <div className="stud-mark-analyze-graph">
                        {graphErr ? (
                          <span>Exam not yet conducted</span>
                        ) : (
                          <span>{`${stdMarkDetails.admissiongrade} - ${stdMarkDetails.section}`}</span>
                        )}
                        <ProgressChart graphData={graphData} />
                      </div>
                      <div className="stud-mark-analyze-percent">
                        <FaPercent />
                        <span>Total Pass</span>
                        {totalPercent.totalPassPercent && (
                          <p>{totalPercent.totalPassPercent}</p>
                        )}
                      </div>
                    </div>
                    <div className="stud-mark-analyze-score">
                      <div className="mark-analyze-score-card">
                        {totalPercent.totalPassPercent && (
                          <p>{totalPercent.totalPassPercent}</p>
                        )}
                        <span>teachers Scored above 35%</span>
                      </div>
                      <div className="mark-analyze-score-card">
                        {totalPercent.failPercent && (
                          <p>{totalPercent.failPercent}</p>
                        )}
                        <span>teachers Scored below 35%</span>
                      </div>
                    </div>
                    <div className="stud-mark-scale">
                      <ul>
                        <li>
                          <span></span>
                          {totalPercent.highDistinctionPercent && (
                            <p>{`${totalPercent.highDistinctionPercent}%`}</p>
                          )}
                          <p>High Distinction (&gt; 90%)</p>
                        </li>
                        <li>
                          <span style={{ backgroundColor: "#5BC7E6" }}></span>
                          {totalPercent.averagePercent && (
                            <p>{`${totalPercent.averagePercent}%`}</p>
                          )}
                          <p>Average (70-80%)</p>
                        </li>
                        <li>
                          <span style={{ backgroundColor: "#7963CD" }}></span>
                          {totalPercent.belowAveragePercent && (
                            <p>{`${totalPercent.belowAveragePercent}%`}</p>
                          )}
                          <p>Below Average (&lt; 35-60%)</p>
                        </li>
                        <li>
                          <span style={{ backgroundColor: "#EE0B0B" }}></span>
                          {totalPercent.failPercent && (
                            <p>{`${totalPercent.failPercent}%`}</p>
                          )}
                          <p> Fail (&lt; 35%)</p>
                        </li>
                      </ul>
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

export default TeacherDashboard;
