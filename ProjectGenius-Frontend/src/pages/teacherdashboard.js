import React, { useEffect, useState } from "react";
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";
import "react-datepicker/dist/react-datepicker.css";

import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCheckCircle, FaClosedCaptioning, FaCross, FaPercent, FaRegArrowAltCircleRight } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaArrowTrendDown, FaArrowTrendUp, FaX } from "react-icons/fa6";
import {
  MdOutlineRemoveRedEye,
  MdOutlineClass,
  MdOutlineToday,
} from "react-icons/md";
import TimeTablePopup from "./components/timetablepopup";
import Attendance from "./components/attendance";
import { findAttendance, getfixedschedule } from "../actions/adminAction";
import { setAuthRec } from "../lib/localstorage";
import { FaxRounded } from "@mui/icons-material";
import { IoIosCloseCircle } from "react-icons/io";

const TeacherDashboard = () => {
    
  const [teacherId,setTeacherId] = useState(JSON.parse(localStorage.getItem("TEACHER_DATA")))
  const [schedule, setSchedule] = useState('')
  const [currentDaySchedule, setCurrentDaySchedule] = useState([]);
  const [AttendanceView, setAttendanceView] = useState('');

  const TeacherId = teacherId.teacherId
  const Thismonth = new Date().toLocaleString('en-US', { month: 'long' })
  const Today = new Date().toLocaleDateString()
  const [showPopup, setShowPopup] = useState({
    teacherTimetable: false,
    teacherAttendance: false,
  });
  const [tchrAttDate, settchrAttDate] = useState("");
  const [stdAttDetails, setStdAttDetails] = useState({
    class: "",
    section: "",
    date: "",
  });
  const [stdMarkDetails, setStdMarkDetails] = useState({
    class: "",
    section: "",
    test: "quarterly",
  });

  const handleTimetablePopup = () => {
    setShowPopup((prev) => ({
      ...prev,
      teacherTimetable: true,
    }));
  };

  const handleAttendancePopup = () => {
    setShowPopup((prev) => ({
      ...prev,
      teacherAttendance: true,
    }));
  };
  
  const getSchedule = async () => {
    try {
      const Scheduledata = {
        teacherId: TeacherId
      }
      console.log(Scheduledata, '---sch')
      let { status, result, result2 } = await getfixedschedule(Scheduledata)
      console.log(result2, '---result2')
      if (status == true) {
        setSchedule(result)
      }
    } catch (err) {
      console.log(err, '---err')
    }
  }
  useEffect(() => {
    getSchedule()
  }, [TeacherId])
  console.log(schedule,'---scehdule')

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
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      // Filter the processed schedule for the current day
      const currentDayData = processedData.find(
        (dayData) => dayData.day.toLowerCase() === today.toLowerCase()
      );
      setCurrentDaySchedule(currentDayData || []);
    }
  }, [schedule]);
 
  const getAttendance = async () => {
    try {
      const attendata = {
        date: Today,
      }
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
  console.log(AttendanceView, '----View')
  const IndividualAttendanceView = AttendanceView && AttendanceView.attendance && AttendanceView.attendance ? AttendanceView.attendance.find((each) => TeacherId === each.teacherId) : null
  console.log(IndividualAttendanceView,'---attendance')
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
              <TimeTablePopup data = {schedule.schedule}/>
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
        <TeacherSidebar />
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h2 className="dashboard-title">Teacher Dashboard</h2>
            <div className="dashboard-tchr-info">
              <div className="dashboard-segments">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>My Attendance Status</p>
                    <button type="button" onClick={handleAttendancePopup} className="tchr-month-att-btn">
                      <MdOutlineRemoveRedEye />
                      Monthly Attendance
                    </button>
                  </div>
                  {IndividualAttendanceView && IndividualAttendanceView ? (IndividualAttendanceView.status && IndividualAttendanceView.status === 'Present' ? (
                     <div className="tchr-att-present">
                     <FaCheckCircle />
                     <p>{IndividualAttendanceView.status}</p>
                     <span>{Today}</span>
                   </div> 
                  ):(
                    <div className="tchr-att-absent">
                    <IoIosCloseCircle size={25}/>
                      <p>{IndividualAttendanceView.status}</p>
                      <span>{Today}</span>
                    </div>
                  )):(
                    <div className="tchr-att-absent">
                    <IoIosCloseCircle size={25}/>
                      <p>Waiting...</p>
                      <span>{Today}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="dashboard-segments">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>Schedule</p>
                    <div className="header-input-fields">
                      {currentDaySchedule && currentDaySchedule ? (  <span>
                        Day:{currentDaySchedule.day}
                      </span>): (
                          <span>
                          Day:Sunday
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="tchr-schedule-status">
                  {currentDaySchedule && currentDaySchedule ? (
                    currentDaySchedule.periods && currentDaySchedule.periods.length > 0 ? (
                        <ul>
                          {currentDaySchedule.periods.map((period, periodIndex) => (
                            <li key={periodIndex}>
                              {`${period.class} ${period.section} - ${period.subject}`}
                            </li>
                          ))}
                        </ul>
                  ):(
                    <ul>
                    <li>Free Period</li>
                    <li>Free Period</li>
                    <li>Free Period</li>
                  </ul>
                  )):(
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
            </div>
            <div className="dashboard-stud-info">
              <div className="dashboard-stud-att">
                <div className="dashboard-segments">
                  <div className="dashboard-segment-content">
                    <div className="tchr-att-header">
                      <p>Student Attendance</p>
                      <div className="header-input-fields">
                        <div className="dashboard-multi-select">
                          <MdOutlineClass />
                          <select
                            style={{ width: "90px" }}
                            value={stdAttDetails.class}
                            onChange={(e) =>
                              setStdAttDetails((prev) => ({
                                ...prev,
                                class: e.target.value,
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
                            value={stdAttDetails.section}
                            onChange={(e) =>
                              setStdAttDetails((prev) => ({
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
                        <div className="date-field-container">
                          <MdOutlineToday />
                          <input
                            type="date"
                            value={stdAttDetails.date}
                            onChange={(e) =>
                              setStdAttDetails((prev) => ({
                                ...prev,
                                date: e.target.value,
                              }))
                            }
                          />
                          <span>
                            <button type="button">
                              <RiArrowDropDownLine />
                            </button>
                          </span>
                        </div>
                        <button className="input-trigger-btn" type="button">
                        <FaRegArrowAltCircleRight />
                        </button>
                      </div>
                    </div>
                    <div className="stud-att-status">
                      <div className="att-status-container">
                        <div className="att-status-container-head">
                          <p>36</p>
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
                          <p>3</p>
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
                    <p>Student Marksheet Analysis</p>
                    <div className="header-input-fields">
                      <div className="dashboard-multi-select">
                        <MdOutlineClass />
                        <select
                          style={{ width: "90px" }}
                          value={stdMarkDetails.class}
                          onChange={(e) =>
                            setStdMarkDetails((prev) => ({
                              ...prev,
                              class: e.target.value,
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
                      <button className="input-trigger-btn" type="button">
                        <FaRegArrowAltCircleRight />
                        </button>
                    </div>
                  </div>
                  <div className="stud-mark-analyze">
                    <div className="stud-mark-analyze-nav">
                      <span
                        className={stdMarkDetails.test === 'quarterly' ? 'selected' : null}
                        onClick={() =>
                          setStdMarkDetails((prev) => ({
                            ...prev,
                            test: "quarterly",
                          }))
                        }
                      >
                        Quarterly
                      </span>
                      <span
                        className={stdMarkDetails.test === 'halfYearly' ? 'selected' : null}
                        onClick={() =>
                          setStdMarkDetails((prev) => ({
                            ...prev,
                            test: "halfYearly",
                          }))
                        }
                      >
                        Half- Yearly
                      </span>
                      <span
                        className={stdMarkDetails.test === 'annual' ? 'selected' : null}
                        onClick={() =>
                          setStdMarkDetails((prev) => ({
                            ...prev,
                            test: "annual",
                          }))
                        }
                      >
                        Annual
                      </span>
                    </div>
                    <div className="stud-mark-analyze-chart">
                      <div className="stud-mark-analyze-graph">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/student-mark-analysis.png`}
                          alt="graph"
                        />
                      </div>
                      <div className="stud-mark-analyze-percent">
                        <FaPercent />
                        <span>Total Pass</span>
                        <p>77%</p>
                      </div>
                    </div>
                    <div className="stud-mark-analyze-score">
                      <div className="mark-analyze-score-card">
                        <p>40</p>
                        <span>Students Scored above 35%</span>
                      </div>
                      <div className="mark-analyze-score-card">
                        <p>5</p>
                        <span>Students Scored below 35%</span>
                      </div>
                    </div>
                    <div className="stud-mark-scale">
                      <ul>
                        <li>
                          <span></span>
                          <p>20%</p>
                          <p>High Distinction (&lt; 90%)</p>
                        </li>
                        <li>
                          <span style={{ backgroundColor: "#5BC7E6" }}></span>
                          <p>60%</p>
                          <p>Average (70-80%)</p>
                        </li>
                        <li>
                          <span style={{ backgroundColor: "#7963CD" }}></span>
                          <p>15%</p>
                          <p>Below Average (&lt; 35-60%)</p>
                        </li>
                        <li>
                          <span style={{ backgroundColor: "#EE0B0B" }}></span>
                          <p>5%</p>
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
