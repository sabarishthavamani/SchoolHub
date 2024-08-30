import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AlertConfirm, { Button } from "react-alert-confirm";
//import components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TimeTablePreview from "./components/timetablepreview";
//import Action
import {
  getSingleteacher,
  createteacherschedule,
  getfixedschedule,
  viewTeacher,
  findClass,
  findWholeClass,
  createStudentSchedule,
  getStudentcShedule,
} from "../actions/adminAction";
//import lib
import toastAlert from "../lib/toast";
import AdminSidebar from "./components/Adminsidebar";
import AdminHeader from "./components/AdminHeader";
import TeacherSidebar from "./components/teachersidebar";
import TeacherHeader from "./components/teachernavbar";

const initialTimeTable = [
  {
    day: "Monday",
    periods: {
      period1: {
        class: "",
        section: "",
        subject: "",
      },
      period2: {
        class: "",
        section: "",
        subject: "",
      },
      period3: {
        class: "",
        section: "",
        subject: "",
      },
      period4: {
        class: "",
        section: "",
        subject: "",
      },
      period5: {
        class: "",
        section: "",
        subject: "",
      },
      period6: {
        class: "",
        section: "",
        subject: "",
      },
      period7: {
        class: "",
        section: "",
        subject: "",
      },
      period8: {
        class: "",
        section: "",
        subject: "",
      },
    },
  },
  {
    day: "Tuesday",
    periods: {
      period1: {
        class: "",
        section: "",
        subject: "",
      },
      period2: {
        class: "",
        section: "",
        subject: "",
      },
      period3: {
        class: "",
        section: "",
        subject: "",
      },
      period4: {
        class: "",
        section: "",
        subject: "",
      },
      period5: {
        class: "",
        section: "",
        subject: "",
      },
      period6: {
        class: "",
        section: "",
        subject: "",
      },
      period7: {
        class: "",
        section: "",
        subject: "",
      },
      period8: {
        class: "",
        section: "",
        subject: "",
      },
    },
  },
  {
    day: "Wednesday",
    periods: {
      period1: {
        class: "",
        section: "",
        subject: "",
      },
      period2: {
        class: "",
        section: "",
        subject: "",
      },
      period3: {
        class: "",
        section: "",
        subject: "",
      },
      period4: {
        class: "",
        section: "",
        subject: "",
      },
      period5: {
        class: "",
        section: "",
        subject: "",
      },
      period6: {
        class: "",
        section: "",
        subject: "",
      },
      period7: {
        class: "",
        section: "",
        subject: "",
      },
      period8: {
        class: "",
        section: "",
        subject: "",
      },
    },
  },
  {
    day: "Thursday",
    periods: {
      period1: {
        class: "",
        section: "",
        subject: "",
      },
      period2: {
        class: "",
        section: "",
        subject: "",
      },
      period3: {
        class: "",
        section: "",
        subject: "",
      },
      period4: {
        class: "",
        section: "",
        subject: "",
      },
      period5: {
        class: "",
        section: "",
        subject: "",
      },
      period6: {
        class: "",
        section: "",
        subject: "",
      },
      period7: {
        class: "",
        section: "",
        subject: "",
      },
      period8: {
        class: "",
        section: "",
        subject: "",
      },
    },
  },
  {
    day: "Friday",
    periods: {
      period1: {
        class: "",
        section: "",
        subject: "",
      },
      period2: {
        class: "",
        section: "",
        subject: "",
      },
      period3: {
        class: "",
        section: "",
        subject: "",
      },
      period4: {
        class: "",
        section: "",
        subject: "",
      },
      period5: {
        class: "",
        section: "",
        subject: "",
      },
      period6: {
        class: "",
        section: "",
        subject: "",
      },
      period7: {
        class: "",
        section: "",
        subject: "",
      },
      period8: {
        class: "",
        section: "",
        subject: "",
      },
    },
  },
  {
    day: "Saturday",
    periods: {
      period1: {
        class: "",
        section: "",
        subject: "",
      },
      period2: {
        class: "",
        section: "",
        subject: "",
      },
      period3: {
        class: "",
        section: "",
        subject: "",
      },
      period4: {
        class: "",
        section: "",
        subject: "",
      },
      period5: {
        class: "",
        section: "",
        subject: "",
      },
      period6: {
        class: "",
        section: "",
        subject: "",
      },
      period7: {
        class: "",
        section: "",
        subject: "",
      },
      period8: {
        class: "",
        section: "",
        subject: "",
      },
    },
  },
];

function StudentTimeTable() {
  //state
  // const [teacherName, setTeacherName] = useState("");
  // const [teacherId, setTeacherId] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [teachingSubject, setTeachingSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [ID, setID] = useState();
  const [timeTable, setTimeTable] = useState(initialTimeTable);
  const [submitErr, setSubmitErr] = useState(false);

  const { Id } = useParams();

  const navigate = useNavigate();

  const [teacherData] = useState(
    JSON.parse(localStorage.getItem("TEACHER_DATA"))
  );
  const teacherId = teacherData.teacherId;
  const teacherName = teacherData.name;
  const getData = async () => {
    try {
      let { status, result } = await viewTeacher();
      if (status === true) {
        const teachingSubList = result
          .flatMap((teacher) => teacher.subjects.split(","))
          .reduce((uniqueSubjects, subject) => {
            if (!uniqueSubjects.has(subject)) {
              uniqueSubjects.add(subject);
            }
            return uniqueSubjects;
          }, new Set());

        console.log(Array.from(teachingSubList));

        console.log(teachingSubList, "teachingSubList...");
        setID(result._id);
        // use this setTeachingSubject([...teachingSubList])
        // (or) this
        setTeachingSubject(Array.from(teachingSubList));
      }
    } catch (err) {
      console.log(err, "---err");
    }
  };
  useEffect(() => {
    getData(Id);
    classDetails();
  }, []);

  const classDetails = async () => {
    try {
      const teachClass = await findWholeClass();
      const classData = teachClass.result;
      console.log(classData, "classData.,,..,,..");
      const singleTeacherClass = classData.filter(
        (data) => data.teacherId === teacherId
      );
      console.log(singleTeacherClass, "singleTeacherClass.,,..,,..");
      const findpro = singleTeacherClass
        .filter((teacher) =>
          teacher.status.some((status) => status.role === "Class Teacher")
        )
        .map((teacher) =>
          teacher.status.filter((status) => status.role === "Class Teacher")
        );

      if (findpro.length > 0 && findpro[0].length > 0) {
        setSelectedClass(findpro[0][0].className);
        console.log(findpro[0][0].className, "classnaammeee...");
        setSelectedSection(findpro[0][0].section);
        console.log(findpro, "filterclssdata.,,..,,..");
      }
    } catch (err) {
      console.log(err, "---err");
    }
  };

  const getIndividualData = async () => {
    try {
      const data = {
        teacherId: teacherId,
      };
      const { status, result } = await getStudentcShedule(data);
      if (status === true) {
        setTimeTable(result.schedule);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getIndividualData();
  }, [teacherId]);

  const addTimeSlot = async (event) => {
    event.preventDefault();
    const updatedTimeTable = [...timeTable];
    const dayIndex = updatedTimeTable.findIndex(
      (day) => day.day === selectedDay
    );

    if (dayIndex !== -1) {
      const selectedPeriods = updatedTimeTable[dayIndex].periods;

      if (selectedPeriods.hasOwnProperty(selectedTimeSlot)) {
        // Update the selected time slot with the provided details
        const addPeriod = selectedPeriods[selectedTimeSlot];
        if (
          addPeriod.class !== "" &&
          addPeriod.section !== "" &&
          addPeriod.subject !== ""
        ) {
          const [action] = await AlertConfirm(
            "Are you sure, you want to update Time Slot"
          );
          if (action) {
            selectedPeriods[selectedTimeSlot] = {
              class: selectedClass,
              section: selectedSection,
              subject: selectedSubject,
            };
            setSubmitErr(true);
            setTimeTable(updatedTimeTable);
            setSelectedDay("");
            setSelectedTimeSlot("");
            setSelectedClass("");
            setSelectedSection("");
            setSelectedSubject("");
          }
        } else {
          selectedPeriods[selectedTimeSlot] = {
            class: selectedClass,
            section: selectedSection,
            subject: selectedSubject,
          };
          setSubmitErr(true);
          setTimeTable(updatedTimeTable);
          setSelectedDay("");
          setSelectedTimeSlot("");
          setSelectedClass("");
          setSelectedSection("");
          setSelectedSubject("");
        }
      } else {
        return alert("Error: Provide valid Time Period!");
      }
    } else {
      return alert("Error: Provide valid Day!");
    }
  };

  const handleDeleteTimeSlot = async () => {
    const updatedTimeTable = [...timeTable];
    const dayIndex = updatedTimeTable.findIndex(
      (day) => day.day === selectedDay
    );

    if (dayIndex !== -1) {
      const selectedPeriods = updatedTimeTable[dayIndex].periods;
      console.log(selectedPeriods, "Mo");

      if (selectedPeriods.hasOwnProperty(selectedTimeSlot)) {
        // Update the selected time slot with the provided details
        const delPeriod = selectedPeriods[selectedTimeSlot];
        if (
          delPeriod.class !== "" &&
          delPeriod.section !== "" &&
          delPeriod.subject !== ""
        ) {
          const [action] = await AlertConfirm(
            "Are you sure, you want to delete the Time Slot"
          );
          if (action) {
            selectedPeriods[selectedTimeSlot] = {
              class: "",
              section: "",
              subject: "",
            };
            setSubmitErr(true);
          }
        } else {
          alert("No Time Slot to delete.");
        }
        setTimeTable(updatedTimeTable);
        setSelectedDay("");
        setSelectedTimeSlot("");
        setSelectedClass("");
        setSelectedSection("");
      } else {
        alert("Error: Provide valid Time Period!");
      }
    } else {
      alert("Error: Provide valid Day!");
    }
  };

  const disableAddBtn =
    teacherName !== "" &&
    teacherId !== "" &&
    selectedDay !== "" &&
    selectedTimeSlot !== "" &&
    selectedClass !== "" &&
    selectedSection !== "" &&
    selectedSubject !== "";

  const disableDeleteBtn =
    teacherName !== "" &&
    teacherId !== "" &&
    selectedDay !== "" &&
    selectedTimeSlot !== "";

  const handleSubmit = async () => {
    const data = {
      teacherName: teacherName,
      teacherId: teacherId,
      schedule: timeTable,
    };
    try {
      const { status, message, result } = await createStudentSchedule(data);
      if (status === true) {
        setTimeTable(initialTimeTable);
        toastAlert("success", message);
        // navigate(`/teachertimetable/${teacherId}`);
        window.location.reload();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle other errors, e.g., show a generic error message to the user
    }
  };

  const handlePreClick = () => {
    navigate("/teacher-dashboard");
  };

  return (
    <div className="dashboard-page">
      <TeacherHeader />
      <div className="dashboard-main">
        <TeacherSidebar />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Student Schedule</h2>
          <div
            className="class-details"
            style={{ width: "85%", borderRadius: "15px" }}
          >
            <form action="" className="teacher-form">
              <div className="teach-box">
                <label htmlFor="">
                  Teacher Name<sup>*</sup>
                </label>
                <input type="text" id="teacherName" value={teacherName} />
              </div>
              {/* <div className="teach-box">
                  <label htmlFor="teacherId">
                    Teacher ID<sup>*</sup>
                  </label>
                  <input type="text" id="teacherId" value={teacherId} />
                </div> */}
              <div className="teach-box">
                <label htmlFor="day">
                  Day<sup>*</sup>
                </label>
                <select
                  id="day"
                  onChange={(e) => setSelectedDay(e.target.value)}
                  value={selectedDay}
                >
                  <option value="">Select</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="">
                  Class <sup>*</sup>
                </label>
                <select id="class" value={selectedClass}>
                  <option>{selectedClass}</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="">
                  Section<sup>*</sup>
                </label>
                <select id="selection" value={selectedSection}>
                  <option>{selectedSection}</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="timeSlot">
                  Time Slot <sup>*</sup>
                </label>
                <select
                  id="timeSlot"
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  value={selectedTimeSlot}
                >
                  <option value="">Select</option>
                  <option>period1</option>
                  <option>period2</option>
                  <option>period3</option>
                  <option>period4</option>
                  <option>period5</option>
                  <option>period6</option>
                  <option>period7</option>
                  <option>period8</option>
                </select>

                <div className="teach-box">
                  <button
                    type="button"
                    style={{
                      backgroundColor: disableDeleteBtn ? null : "gray",
                      border: "none",
                    }}
                    disabled={!disableDeleteBtn}
                    onClick={handleDeleteTimeSlot}
                    title="Delete Time Slot"
                    className="btn btn-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
              <div className="teach-box">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Select</option>
                  {teachingSubject.map((sub) => (
                    <option value={sub}>{sub}</option>
                  ))}
                </select>

                <div className="teach-box">
                  <button
                    type="submit"
                    style={{
                      backgroundColor: disableAddBtn ? null : "gray",
                      border: "none",
                    }}
                    disabled={!disableAddBtn}
                    title="Add Time Slot"
                    className="btn btn-warning"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="sub-btnn">
            <button
              className="schedulesubmit"
              onClick={() => {
                handlePreClick();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
              Go Back
            </button>
            <button
              className="schedulesubmit"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {submitErr && (
            <span className="submit-err-text">
              *Changes occurred, click submit once completed your modification
            </span>
          )}
          <TimeTablePreview
            timeTable={timeTable}
            teacherId={teacherId}
            setTimeTable={setTimeTable}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentTimeTable;
