import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
//import Components
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";
//import Actions
import { findmarksheet, findsinglemarksheet, updatemarksheet } from "../actions/teacherAction";
//import Lib
import toastAlert from "../lib/toast";
//import Components
import EditMarkPopUp from "./components/editmarkpopup";
import Studentsidebar from "./components/studentsidebar";
import StudentHeader from "./components/studentnavbar";
import { viewStudent } from "../actions/adminAction";

const initialFormValue = {
  admissiongrade: "",
  section: "",
  exam: "",
};
const StudentMarksheetList = () => {

  const [studentInfo, setstudentInfo] = useState("");

 

  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [formValue, setFormValue] = useState(initialFormValue);
  const [selectedStudent, setSelectedStudent] = useState("");

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
        const studentData = JSON.parse(localStorage.getItem("STUDENT_DATA"));
        const stdID = studentData ? studentData.studentId : '';
  
        let { status, result, errors, message } = await findsinglemarksheet();
        if (status === true) {
            const filteredMarksheets = result.filter(item => item.exam === formValue.exam && item.marks.some(mark => mark.studentId === stdID));
            
            // Filter the marks array for the selected studentId
            const selectedStudentMarks = filteredMarksheets.length > 0 ? filteredMarksheets[0].marks.filter(mark => mark.studentId === stdID) : [];
            
            // Update the state with the filtered marks for the selected studentId
            setData(selectedStudentMarks);
            console.log(selectedStudentMarks, 'filtteerrr...');
        }
        if (status === false) {
            if (errors) {
                setErrors(errors);
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    admissiongrade: errors.admissiongrade,
                    section: errors.section,
                    exam: errors.exam,
                }));
            } else if (message) {
                toastAlert("error", message);
            }
        }
    } catch (err) {
        console.error(err);
    }
  };
  


  console.log(data, "---data");

  const handleEdit = (studentId) => {
    const studentDetail = data.marks.find(
      (item) => item.studentId === studentId
    );
    if (studentDetail) {
      setSelectedStudent(studentDetail);
    }
  };

  const handleCancelEdit = () => {
    setSelectedStudent("");
  };

  const handleUpdateMark = async (studentData) => {
    const indexToUpdate = data.marks.findIndex(
      (item) => item.studentId === studentData.studentId
    );

    if (indexToUpdate !== -1) {
      const updatedMarks = [...data.marks];
      const total = Object.values(studentData.subjects).reduce(
        (acc, subject) => acc + parseInt(subject || 0, 10),
        0
      );
      updatedMarks[indexToUpdate] = { ...studentData, total: total.toString() };

      setData((prev) => ({
        ...prev,
        marks: updatedMarks,
      }));

      const Data = {
        admissiongrade: studentData.admissiongrade,
        section: studentData.section,
        exam: exam,
        marks: updatedMarks
      }
      const { status,message } = await updatemarksheet(Data)
      if(status === true){
        toastAlert('success',message)
      }

    } else {
      const total = Object.values(studentData.subjects).reduce(
        (acc, subject) => acc + parseInt(subject || 0, 10),
        0
      );
      setData((prev) => ({
        ...prev,
        marks: [...data.marks, { ...studentData, total: total.toString() }],
      }));

      //write the api call here :-)

    }

    setSelectedStudent("");
  };

  return (
    <>
      <div className="attendance">
        <StudentHeader />
        <div className="attendance-content">
          <Studentsidebar />
          <div className="att-sheet">
            <div className="class-details">
              {/* <div className="stdmark-class">
                <label>class</label>
                <select
                  onChange={handleChange}
                  value={admissiongrade}
                  name="admissiongrade"
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
                <span className="attendance-error">
                  {inputErrors.admissiongrade}
                </span>
              </div>
              <div className="stdmark-class">
                <label>Section</label>
                <select value={section} onChange={handleChange} name="section">
                  <option></option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                  <option>F</option>
                </select>
                <span className="attendance-error">{inputErrors.section}</span>
              </div> */}
              <div className="stdmark-class">
                <label>Exam Name</label>
                <select value={exam} onChange={handleChange} name="exam">
                  <option></option>
                  <option value='Quarterly'>Quarterly Examination</option>
                <option value='Halfyearly'>Half Yearly Examination</option>
                <option value='Annual'>Annual Examination</option>
                </select>
                <span className="attendance-error">{inputErrors.exam}</span>
              </div>
              <button className="sheet-button" type="button" onClick={getData}>
                View Report Card
              </button>
            </div>
            <div className="mark-record">
              <p>Student Marksheet</p>
              <table className="mark-sheet">
                <thead>
                  <tr className="sheet-head">
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Subject 1</th>
                    <th>Subject 2</th>
                    <th>Subject 3</th>
                    <th>Subject 4</th>
                    <th>Subject 5</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, key) => {
                      return (
                        <tr className="sheet-body" key={key}>
                          <td>{item.studentId}</td>
                          <td>{item.name}</td>
                          <td>
                            <span className="sub1">
                              {item.subjects.subject1}
                            </span>
                          </td>
                          <td>
                            <span className="sub2">
                              {item.subjects.subject2}
                            </span>
                          </td>
                          <td>
                            <span className="sub3">
                              {item.subjects.subject3}
                            </span>
                          </td>
                          <td>
                            <span className="sub4">
                              {item.subjects.subject4}
                            </span>
                          </td>
                          <td>
                            <span className="sub5">
                              {item.subjects.subject5}
                            </span>
                          </td>
                          <td>
                            <span className="total">{item.total}</span>
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
      {selectedStudent && (
        <EditMarkPopUp
          studentDetail={selectedStudent}
          handleCancelEdit={handleCancelEdit}
          handleUpdateMark={handleUpdateMark}
        />
      )}
    </>
  );
};

export default StudentMarksheetList;
