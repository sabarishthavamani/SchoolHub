import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faTrash,
  faUpload,
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
  findAllSection,
} from "../actions/adminAction";
//import lib
import toastAlert from "../lib/toast";
import {
  assignHomeWork,
  assignMeeting,
  viewHomeWork,
  viewMeeting,
} from "../actions/teacherAction";
import HomeWorkPreview from "./components/homeworkpreview";
import MeetingPreview from "./components/meetinglistpreview";
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";

function ParentsMeeting() {
  //state
  // const [teacherName, setTeacherName] = useState("");
  // const [teacherId, setTeacherId] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [studentList, setstudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignDate, setassignDate] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");
  const [title, setTitle] = useState("");
  const [meetingList, setmeetingList] = useState("");
  const [fileUploads, setfileUploads] = useState("");

  const { Id } = useParams();

  const navigate = useNavigate();

  const [teacherData] = useState(
    JSON.parse(localStorage.getItem("TEACHER_DATA"))
  );
  const teacherId = teacherData.teacherId;
  const teacherName = teacherData.name;

  // const getData = async () => {
  //   try {
  //     let { status, result } = await viewTeacher();
  //     if (status === true) {
  //       const teachingSubList = result
  //         .flatMap((teacher) => teacher.subjects.split(","))
  //         .reduce((uniqueSubjects, subject) => {
  //           if (!uniqueSubjects.has(subject)) {
  //             uniqueSubjects.add(subject);
  //           }
  //           return uniqueSubjects;
  //         }, new Set());

  //       console.log(Array.from(teachingSubList));

  //       console.log(teachingSubList, "teachingSubList...");

  //       setstudentList(Array.from(teachingSubList));
  //     }
  //   } catch (err) {
  //     console.log(err, "---err");
  //   }
  // };

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

  const allStudents = async () => {
    try {
      const findSection = await findAllSection();
      const studData = findSection.result;
      console.log(studData, "studData...");
      if (studData) {
        const fillterStudent = studData.filter(
          (data) =>
            data.admissiongrade === selectedClass &&
            data.section === selectedSection
        );
        console.log(fillterStudent, "fillterStudent...");
        const studentsOnly = fillterStudent.flatMap((result) =>
          result.students.map((std) => std.name)
        );
        console.log(studentsOnly, "studentsOnly...");
        setstudentList(studentsOnly);
      } else {
        console.log("studData is empty or undefined");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await classDetails();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await allStudents();
    };
    fetchData();
  }, [selectedClass, selectedSection]);

  const handleSubmit = async () => {
    if (
      !teacherName ||
      !teacherId ||
      !assignDate ||
      !selectedClass ||
      !selectedSection ||
      !title ||
      !descriptionContent
    ) {
      toastAlert("error", "Please fill in all the required fields");
      return;
    }

    let studentName;
    if (selectedStudents === "") {
      studentName = "All Students";
    } else {
      studentName = selectedStudents;
    }

    const formData = new FormData();
    formData.append("teacherId", teacherId);
    formData.append("name", teacherName);
    formData.append("assignDate", assignDate);
    formData.append("className", selectedClass);
    formData.append("section", selectedSection);
    formData.append("studentName", studentName);
    formData.append("title", title);
    formData.append("description", descriptionContent);
    formData.append("fileUploads", fileUploads);

    try {
      const { status, message, result } = await assignMeeting(formData);
      if (status === true) {
        setassignDate("");
        setDueDate("");
        setSelectedStudents("");
        setDescriptionContent("");
        setfileUploads("");
        toastAlert("success", message);
        setmeetingList(result);
        getIndividualData();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle other errors, e.g., show a generic error message to the user
    }
  };

  const getIndividualData = async () => {
    try {
      const { status, result } = await viewMeeting();
      if (status === true) {
        setmeetingList(result);
        console.log(result, "list result.....");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePreClick = () => {
    navigate("/teacher-dashboard");
  };

  const handleFilePhotoChange = (event) => {
    const { name, files } = event.target;
    const selectedFile = files[0];
    setfileUploads(selectedFile);
  };

  const getPhotoName = () => {
    if (typeof fileUploads === "string" && fileUploads) {
      return fileUploads.split("/").pop();
    } else if (typeof fileUploads === "object" && fileUploads) {
      return fileUploads.name;
    } else {
      return "";
    }
  };

  useEffect(() => {
    getIndividualData();
  }, []);

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
                <label htmlFor="teacherId">
                  Teacher ID<sup>*</sup>
                </label>
                <input type="text" id="teacherId" value={teacherId} />
              </div>
              <div className="teach-box">
                <label htmlFor="assignDate">
                  Meeting Date<sup>*</sup>
                </label>
                <input
                  type="date"
                  id="assignDate"
                  value={assignDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setassignDate(e.target.value)}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="class">
                  Class<sup>*</sup>
                </label>
                <select id="class" value={selectedClass}>
                  <option>{selectedClass}</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="section">
                  Section<sup>*</sup>
                </label>
                <select id="section" value={selectedSection}>
                  <option>{selectedSection}</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="subject">
                  Students<sup>*</sup>
                </label>
                <select
                  id="subject"
                  value={selectedStudents}
                  onChange={(e) => setSelectedStudents(e.target.value)}
                >
                  <option value="">All Students</option>
                  {studentList.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="title">
                  Meeting Title<sup>*</sup>
                </label>
                <textarea
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  minLength={10}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    outline: "none",
                    height: "40px",
                  }}
                ></textarea>
              </div>
              <div className="teach-box">
                <label htmlFor="description">
                  Description<sup>*</sup>
                </label>
                <textarea
                  id="description"
                  value={descriptionContent}
                  onChange={(e) => setDescriptionContent(e.target.value)}
                  minLength={10}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    outline: "none",
                    resize: "none",
                    height: "70px",
                  }}
                ></textarea>
              </div>
              <div className="teach-box">
                <label>Upload Files</label>
                <input
                  type="file"
                  id="file"
                  name="fileUploads"
                  onChange={handleFilePhotoChange}
                />
                <label htmlFor="file" className="t-photo">
                  <div style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  {typeof fileUploads === "object" ? (
                    <span>{fileUploads.name}</span>
                  ) : (
                    <span>{getPhotoName()}</span>
                  )}
                </label>
                {typeof fileUploads === "object" && (
                  <img
                    src={URL.createObjectURL(fileUploads)}
                    style={{ width: "60px", marginTop: "5px" }}
                  />
                )}
                {typeof fileUploads === "string" && (
                  <img
                    src={fileUploads}
                    style={{ width: "60px", marginTop: "5px" }}
                  />
                )}
              </div>
            </form>
          </div>
          <div className="sub-btnn">
            <button className="schedulesubmit" onClick={handlePreClick}>
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
          <MeetingPreview
            meetingList={meetingList}
            getIndividualData={getIndividualData}
          />
        </div>
      </div>
    </div>
  );
}

export default ParentsMeeting;
