import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
//import Components
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";
//import Actions
import {
  findmarksheet,
  findsinglemarksheet,
  updatemarksheet,
  viewHomeWork,
} from "../actions/teacherAction";
//import Lib
import toastAlert from "../lib/toast";
//import Components
import EditMarkPopUp from "./components/editmarkpopup";
import Studentsidebar from "./components/studentsidebar";
import StudentHeader from "./components/studentnavbar";
import { findWholeClass, viewStudent } from "../actions/adminAction";

const initialFormValue = {
  admissiongrade: "",
  section: "",
  exam: "",
};
const StudentHomeWork = () => {

  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [formValue, setFormValue] = useState(initialFormValue);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [thisDate, setthisDate] = useState("");

  const { exam } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null, // Clear the error for this input
    }));
    setFormValue({ ...formValue, ...{ [name]: value } });
  };

  const getData = async () => {
    try {

      if (!thisDate) {
        toastAlert("error", "Please select a date");
        return;
      }
      
      const studentData = JSON.parse(localStorage.getItem("STUDENT_DATA"));
      const StudentId = studentData ? studentData.studentId : "";
  
      const STDsection = await viewStudent();
      const singleStudentSection = STDsection.result2;
      console.log(singleStudentSection, "singleStudentSection........");
      const filterClass = singleStudentSection.find((data) =>
        data.students.some((student) => student.studentId === StudentId)
      );
      console.log(filterClass, "filterClass.....");
      const filterGrade = filterClass.admissiongrade;
      const filterSection = filterClass.section;
      console.log(filterGrade, "filterGrade...");
      console.log(filterSection, "filterSec...");
  
      const teachClass = await findWholeClass();
      const classData = teachClass.result;
      console.log(classData, "classData.,,..,,..");
      const singleTeacherClass = classData.find((data) =>
        data.status.some(
          (each) =>
            each.className === filterGrade && each.role === "Class Teacher"
        )
      );
      console.log(singleTeacherClass, "singleTeacherClass.,,..,,..");
  
      const getTeacher = singleTeacherClass.name;
      console.log(getTeacher, "Teacher Name...");
  
      const Homework = await viewHomeWork();
      const classHomework = Homework.result;
      console.log(classHomework, "classHomework...");
  
      // Filter homework data based on the selected date
      const filteredHomeWork = classHomework.filter(
        (item) => item.assignDate === thisDate
      );
  
      setData(filteredHomeWork);
  
    } catch (err) {
      console.error(err);
    }
  };  

  console.log(data, "---data");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); 
  };

  return (
    <>
      <div className="attendance">
        <StudentHeader />
        <div className="attendance-content">
          <Studentsidebar />
          <div className="att-sheet">
            <div className="class-details">
              <div className="stdmark-class">
                <label style={{ color: "black", fontWeight: "bold" }}>
                  Select Date
                </label>
                <input
                  type="date"
                  value={thisDate}
                  onChange={(e) => setthisDate(e.target.value)}
                />
                <span className="attendance-error">{inputErrors.exam}</span>
              </div>
              <button className="sheet-button" type="button" onClick={getData}>
                View Home Work
              </button>
            </div>
            <div className="mark-record">
              <p>Home Work List</p>
              <table className="mark-sheet">
                <thead>
                  <tr className="sheet-head">
                    <th>S.No</th>
                    <th>Subject</th>
                    <th>Home Work</th>
                    <th>Assigned Date</th>
                    <th>Due Date</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, key) => {
                      return (
                        <tr className="sheet-body" key={key}>
                          <td>
                            <span className="sub5">{key + 1}</span>
                          </td>
                          <td>
                            {item.homeWork.map((hw, index) => (
                              <span className="sub2" key={index}>
                                {hw.subject}
                              </span>
                            ))}
                          </td>
                          <td>
                            {item.homeWork.map((hw, index) => (
                              <span className="sub3" key={index}>
                                {hw.description}
                              </span>
                            ))}
                          </td>  
                          <td>
                            <span className="sub4">{formatDate(item.assignDate)}</span>
                          </td>
                          <td>
                            <span className="sub1">{formatDate(item.dueDate)}</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHomeWork;
