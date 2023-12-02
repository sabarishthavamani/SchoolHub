import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TimeTablePreview from "./components/timetablepreview";
//import Action
import { getSingleteacher,createteacherschedule, getTeacherSchedule, getfixedschedule } from "../actions/adminAction";
import toastAlert from "../lib/toast";


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

function TeacherSchedule() {
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [teachingSubject, setTeachingSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('')
  const [ID,setID] = useState();
  const [timeTable, setTimeTable] = useState((initialTimeTable));

  // console.log(selectedSubject, "initial")

  
  const {Id} =useParams()

const navigate = useNavigate()

const getData =async (id) =>{
  try{
   let {status,result} = await getSingleteacher(id)
   if(status == true){
    const teachingSubList = result.subjects.split(",")

    setTeacherName(result.name)
    setTeacherId(result.teacherId)
    setID(result._id)
    setTeachingSubject([...teachingSubList])
   }
  }catch(err){
    console.log(err,'---err')
  }
}
useEffect(() => {
  getData(Id)
}, [])

const getIndividualData = async (req,res) => {
  try {
    const data = {
      teacherId:teacherId
    }
    const { status, result } = await getfixedschedule(data);
    if (status === true) {
      setTimeTable(result.schedule);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
    getIndividualData();
}, [teacherId])


  const addTimeSlot = (event) => {
    event.preventDefault();
    const updatedTimeTable = [...timeTable];
    const dayIndex = updatedTimeTable.findIndex(
      (day) => day.day === selectedDay
    );

    if (dayIndex !== -1) {
      const selectedPeriods = updatedTimeTable[dayIndex].periods;

      if (selectedPeriods.hasOwnProperty(selectedTimeSlot)) {
        // Update the selected time slot with the provided details
        selectedPeriods[selectedTimeSlot] = {
          class: selectedClass,
          section: selectedSection,
          subject: selectedSubject,
        };

        setTimeTable(updatedTimeTable);
        setSelectedDay("");
        setSelectedTimeSlot("");
        setSelectedClass("");
        setSelectedSection("");
        setSelectedSubject("");
      } else {
        return alert("Error: Provide valid Time Period!");
      }
    } else {
      return alert("Error: Provide valid Day!");
    }
  };

  const handleDeleteTimeSlot = () => {
    const updatedTimeTable = [...timeTable];
    const dayIndex = updatedTimeTable.findIndex(
      (day) => day.day === selectedDay
    );

    if (dayIndex !== -1) {
      const selectedPeriods = updatedTimeTable[dayIndex].periods;

      if (selectedPeriods.hasOwnProperty(selectedTimeSlot)) {
        // Update the selected time slot with the provided details
        selectedPeriods[selectedTimeSlot] = {
          class: "",
          section: "",
          subject: "",
        };

        setTimeTable(updatedTimeTable);
        setSelectedDay("");
        setSelectedTimeSlot("");
        setSelectedClass("");
        setSelectedSection("");
        setTeachingSubject("");
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
    teachingSubject !== "";

  const disableDeleteBtn =
    teacherName !== "" &&
    teacherId !== "" &&
    selectedDay !== "" &&
    selectedTimeSlot !== "" &&
    selectedClass === "" &&
    selectedSection === "" &&
    selectedSubject === "";

 console.log(ID,'--id')
  const handleSubmit = async () => {
    const data = {
      teacherName:teacherName,
      teacherId:teacherId,
      schedule: timeTable,
    };
    try {
      const { status, message,result} = await createteacherschedule(data);
      if (status === true) {
            setTimeTable(initialTimeTable)
            toastAlert('success',message)
            navigate(`/teachertimetable/${teacherId}`);
      } else if(status === false){
        toastAlert('error',message)
      } 
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle other errors, e.g., show a generic error message to the user
    }
  };
  return (
    <div className="fee-collection">
      <Sidebar Id={ID}/>
      <div className="fee-content">
        <Navbar pageTitle={"Teacher Schedule Setup"} />
        <div className="fee-setup">
          <div className="fee-setup-header">
            <span>Teacher Schedule</span>
          </div>
          <div className="teacher-schedule-container">
            <form className="teacher-schedule-form" onSubmit={addTimeSlot}>
              <div className="teacher-schedule-input">
                <label htmlFor="teacherName">
                  Teacher Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  id="teacherName"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>
              <div className="teacher-schedule-input">
                <label htmlFor="teacherId">
                  Teacher ID<sup>*</sup>
                </label>
                <input
                  type="text"
                  id="teacherId"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                />
              </div>
              <div className="teacher-schedule-controls">
                <div className="teacher-schedule-input">
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
                <div className="teacher-schedule-input">
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
                </div>
              </div>
              <div className="teacher-schedule-controls">
                <div className="teacher-schedule-input class-section-input">
                  <label htmlFor="class">
                    Class <sup>*</sup>
                  </label>
                  <select
                    id="class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">Select</option>
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
                <div className="teacher-schedule-input class-section-input">
                  <label htmlFor="selection">
                    Section<sup>*</sup>
                  </label>
                  <select
                    type="text"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    id="selection"
                  >
                    <option value="">Select</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                  </select>
                </div>
                <div className="teacher-schedule-input">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Select</option>
                    {teachingSubject.map(sub => (<option value={sub}>{sub}</option>))}
                  </select>
                </div>
              </div>
              <div className="teacher-schedule-btn">
                <button
                  type="button"
                  style={{ backgroundColor: disableDeleteBtn ? null : "gray" }}
                  disabled={!disableDeleteBtn}
                  onClick={handleDeleteTimeSlot}
                >
                  Delete Time Slot
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: disableAddBtn ? null : "gray" }}
                  disabled={!disableAddBtn}
                >
                  Add Time Slot
                </button>
              </div>
            </form>
            <TimeTablePreview timeTable={timeTable} teacherId={teacherId} setTimeTable={setTimeTable}/>
          </div>
        </div>
        <button className="schedulesubmit" type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default TeacherSchedule;
