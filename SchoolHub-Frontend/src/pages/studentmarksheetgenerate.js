import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
//import Components
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";
//import Actions
import { findsectionformarks, savemarksheet } from "../actions/teacherAction";
//import Lib
import toastAlert from "../lib/toast";

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADMISSION_GRADE':
      return { ...state, admissiongrade: action.payload }
    case 'SECTION':
      return { ...state, section: action.payload }
    case 'EXAM':
      return { ...state, exam: action.payload }
    case 'MARK':
      return { ...state, marks: action.payload };
    default:
      return state;
  }
}

const GenerateReport = () => {
  const [state, dispatch] = useReducer(reducer, {
    admissiongrade: '',
    section: '',
    exam: '',
    marks: []
  })

  //state
  const [data, setData] = useState("");
  const [Marks, setMarks] = useState("");
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  //navigate
  const navigate = useNavigate()

  const handleAdmission = (event) => {
    dispatch({ type: 'ADMISSION_GRADE', payload: event.target.value })
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      admissiongrade: null,
    }));
  }

  const handleSection = (event) => {

    dispatch({ type: 'SECTION', payload: event.target.value })
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      section: null,
    }));
  }

  const handleExam = (event) => {
    dispatch({ type: 'EXAM', payload: event.target.value })
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      exam: null,
    }));
  }

  const handleMark = (e, student) => {
    const { name, value } = e.target;

    const studentIndex = state.marks.findIndex((item) => item.studentId === student.studentId);

    if (studentIndex !== -1) {
      const updatedMarks = state.marks.map((item, index) => {
        if (index === studentIndex) {
          const updatedSubjects = {
            subject1: item.subjects.subject1,
            subject2: item.subjects.subject2,
            subject3: item.subjects.subject3,
            subject4: item.subjects.subject4,
            subject5: item.subjects.subject5,
            [name]: value,
          };

          const total = Object.values(updatedSubjects).reduce((acc, subject) => acc + parseInt(subject || 0, 10), 0);

          return {
            ...item,
            subjects: updatedSubjects,
            total: total.toString(),
          };
        }
        return item;
      });
      dispatch({ type: 'MARK', payload: updatedMarks });
    } else {
      const newStudent = {
        name: student.name,
        studentId: student.studentId,
        subjects: {
          subject1: name === 'subject1' ? value : '',
          subject2: name === 'subject2' ? value : '',
          subject3: name === 'subject3' ? value : '',
          subject4: name === 'subject4' ? value : '',
          subject5: name === 'subject5' ? value : '',
        },
        total: value,
      };

      const updatedMarks = [...state.marks, newStudent];
      dispatch({ type: 'MARK', payload: updatedMarks });
    }
  };

  const getData = async () => {
    try {
      let Data = {
        admissiongrade: state.admissiongrade,
        section: state.section,
        exam: state.exam
      }
      let { status, result, result2, errors, message } = await findsectionformarks(Data);
      if (status === true) {
        setData(result)
        setMarks(result2)
      }
      if (status === false) {
        if (errors) {
          setErrors(errors)
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            admissiongrade:errors.admissiongrade,
            section:errors.section,
            exam:errors.exam
          }))
        }
        else if (message) {
          toastAlert('error', message)
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(data, '---data')
  console.log(Marks, '---marks')

  const handleSubmit = async () => {
    try {
      const Data = {
        admissiongrade: state.admissiongrade,
        section: state.section,
        exam: state.exam,
        marks: state.marks
      }
      const { status, message } = await savemarksheet(Data)
      if (status === true) {
        toastAlert('success', message)
        navigate('/teacher-marksheet')
      }
      else if (status === false) {
        toastAlert('error', message)
      }
    } catch (err) {
      console.log(err, '-err')
    }
  }
  return (
    <div className="attendance">
      <TeacherHeader />
      <div className="attendance-content">
        <TeacherSidebar />
        <div className="att-sheet">
          <div className="class-details">
            <div className="stdmark-class">
              <label>class</label>
              <select onChange={handleAdmission} value={state.admissiongrade}>
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
              <span className='attendance-error'>{inputErrors.admissiongrade}</span>
            </div>
            <div className="stdmark-class">
              <label>Section</label>
              <select value={state.section} onChange={handleSection}>
                <option></option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
              </select>
              <span className='attendance-error'>{inputErrors.section}</span>
            </div>
            <div className="stdmark-class">
              <label>Exam Name</label>
              <select value={state.exam} onChange={handleExam}>
                <option></option>
                <option value='Quarterly'>Quarterly Examination</option>
                <option value='Halfyearly'>Half Yearly Examination</option>
                <option value='Annual'>Annual Examination</option>
              </select>
              <span className='attendance-error'>{inputErrors.exam}</span>
            </div>
            <button className="sheet-button" type="button" onClick={getData}>Generate Report Card</button>
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
              {Marks && Marks.marks ? (
                <tbody>
                  {Marks.marks.map((item, key) => (
                    <tr className="sheet-body" key={key}>
                      <td>{item.studentId}</td>
                      <td>{item.name}</td>
                      <td><span className="sub1">{item.subjects.subject1}</span></td>
                      <td><span className="sub2">{item.subjects.subject2}</span></td>
                      <td><span className="sub3">{item.subjects.subject3}</span></td>
                      <td><span className="sub4">{item.subjects.subject4}</span></td>
                      <td><span className="sub5">{item.subjects.subject5}</span></td>
                      <td><span className="total">{item.total}</span></td>
                    </tr>
                  ))}
                </tbody>
              ) : (<tbody>
                {data && data.students.map((item, index) => {
                  const studentMarks = state.marks.find((each) => each.studentId === item.studentId)
                  return (
                    <tr className="sheet-body" key={index}>
                      <td>{item.studentId}</td>
                      <td>{item.name}</td>
                      <td>
                        <div className="mark-input">
                          <input type="number" name="subject1" value={studentMarks ? studentMarks.subjects.subject1 : ''} onChange={(e) => handleMark(e, item)} />
                        </div>
                      </td>
                      <td>
                        <div className="mark-input">
                          <input type="number" name="subject2" value={studentMarks ? studentMarks.subjects.subject2 : ''} onChange={(e) => handleMark(e, item)} />
                        </div>
                      </td>
                      <td>
                        <div className="mark-input">
                          <input type="number" name="subject3" value={studentMarks ? studentMarks.subjects.subject3 : ''} onChange={(e) => handleMark(e, item)} />
                        </div>
                      </td>
                      <td>
                        <div className="mark-input">
                          <input type="number" name="subject4" value={studentMarks ? studentMarks.subjects.subject4 : ''} onChange={(e) => handleMark(e, item)} />
                        </div>
                      </td>
                      <td>
                        <div className="mark-input">
                          <input type="number" name="subject5" value={studentMarks ? studentMarks.subjects.subject5 : ''} onChange={(e) => handleMark(e, item)} />
                        </div>
                      </td>
                      <td>
                        <div className="mark-input">
                          <input type="number" value={studentMarks ? studentMarks.total : ''} readOnly />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
                )
              }
            </table>
          </div>
          {Marks && Marks ? null : <button className="sheet-submit" type="button" onClick={handleSubmit}>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
