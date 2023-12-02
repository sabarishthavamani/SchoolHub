import React, { useEffect } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { useState } from "react";
import { getSingleteacher, teacherAllocation } from "../actions/adminAction";
import { useNavigate, useParams } from "react-router-dom";
import toastAlert from "../lib/toast";



const initialFormValue = {
  'name': '',
  'teacherId': '',
  'status':''
}


const TeacherAllocation = () => {
  const [teacherHandles, setTeacherHandles] = useState([])
  const [formValue, setFormValue] = useState(initialFormValue)
  const [data, setData] = useState('')
  const [inputErrors,setInputErrors] = useState({})
  const [errors,setErrors]=useState({})

  const {Id} = useParams() 

  const navigate = useNavigate()
  const { name, teacherId, section, role, subjects, className } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear the error for this input
    }));
    setFormValue({ ...formValue, ...{ [name]: value } })
  }

  const getData = async (id) => {
    try {
      let { status, result } = await getSingleteacher(id);
      if (status === true) {
        setFormValue(prevFormValue => ({ ...prevFormValue, ...result }));
        setData(result)
        const subs = result.subjects
        const subArr = subs.split(",")
        setTeacherHandles([...subArr])
      }
    } catch (err) {
      console.log(err, '--err');
    }
  }
  useEffect(() => {
    getData(Id)
  }, [])
  console.log(data, '---data')
  const Status = {
    role:role,
    className:className,
    subjects:subjects,
    section:section
  }
  const handleSubmit = async () => {
    try {

      let data = {
        name: name,
        teacherId: teacherId,
        status: {...Status}
      }
      console.log(data,'---formdata')
      let { status, message, errors } = await teacherAllocation(data)
      if (status === true) {
        setFormValue(initialFormValue)
        toastAlert('success', message)
        setErrors({})
        navigate(`/teacherview`);
      } if (status === false) {
        if (errors) {
          setErrors(errors);
          // Update the inputErrors state for each input with an error
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            role: errors.role,
            className: errors.className,
            section: errors.section,
            subjects: errors.subjects,
          }));
        }
        if (message) {
          toastAlert('error', message);
        }
      }

    } catch (err) {
      console.log(err, '...err')
    }
  }
  


  return (
    <div className="fee-collection">
      <Sidebar />
      <div className="fee-content">
        <Navbar pageTitle={"Class Teacher Allocation"} />
        <div className="fee-setup">
          <div className="fee-setup-header">
            <span>Class Teacher Allocation</span>
          </div>
          <div className="teacher-schedule-container">
            <form className="teacher-schedule-form">
              <div className="teacher-schedule-input">
                <label htmlFor="teacherName">
                  Teacher Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={name}
                />
              </div>
              <div className="teacher-schedule-input">
                <label htmlFor="teacherId">
                  Teacher ID<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="teacherId"
                  value={teacherId}
                  onChange={handleChange}
                />
              </div>
              <div className="teacher-schedule-input">
                <label htmlFor="class">
                  Class <sup>*</sup>
                </label>
                <select
                  name="className"
                  value={className}
                  onChange={handleChange}
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
                <span className="text-error">{inputErrors.className}</span>
              </div>
              <div className="teacher-schedule-input">
                <label htmlFor="section">
                  Section<sup>*</sup>
                </label>
                <select
                  name="section"
                  value={section}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                  <option>F</option>
                </select>
                <span className="text-error">{inputErrors.section}</span>
              </div>
              <div className="teacher-schedule-input">
                <label htmlFor="role">
                  Teacher Role<sup>*</sup>
                </label>
                <select
                  name="role"
                  value={role}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Class Teacher</option>
                  <option>Subject</option>
                </select>
                <span className="text-error">{inputErrors.role}</span>
              </div>
              <div className="teacher-schedule-input">
                <label htmlFor="subjects">
                  Teacher Handling Subjects<sup>*</sup>
                </label>
                <select
                  name="subjects"
                  value={subjects}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {teacherHandles.map(item => (<option value={item}>{item}</option>))}
                </select>
                <span className="text-error">{inputErrors.subjects}</span>
              </div>
              <div className="teacher-allocation-btn">
                <button type="button" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAllocation;
