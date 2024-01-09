import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from 'uuid';
//import components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
//import actions
import { findClass, findWholeClass, getSingleteacher, teacherAllocation } from "../actions/adminAction";
//import Lib
import toastAlert from "../lib/toast";
//react confirm pop-up package
import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";


const initialValue = {
  role: '',
  className: '',
  section: '',
  subjects: '',
};


const TeacherAllocation = () => {
  //state
  const [teacherHandles, setTeacherHandles] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState('');
  const [allocateDetails, setAllocateDetails] = useState({ ...initialValue })
  const [allocateList, setAllocateList] = useState([])
  const [wholeClass, setWholeclass] = useState([])
  //state for ErrorMsg
  const [errorMsg, setErrorMsg] = useState({
    role: false,
    className: false,
    section: false,
    subjects: false,
  })

  const { Id } = useParams();

  const navigate = useNavigate();

  const { name, teacherId } = formValue;

  const { role, className, section, subjects } = allocateDetails

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setAllocateDetails(prev => ({ ...prev, [name]: value }))
  }

  const isDataAlreadyAllocated = (selectedClass, selectedSection, selectedRole) => {
    // Check if there is any existing allocation with the same class, section, and role
    return wholeClass.some(
      teacher => (
        teacher.status.some(
          allocation => (
            allocation.className === selectedClass &&
            allocation.section === selectedSection &&
            allocation.role === selectedRole
          )
        )
      )
    );
  };
  const handleAdd = async () => {
    // Check if the selected role is 'Class Teacher' and if there's already data for that role
    const isClassTeacher = allocateDetails.role === 'Class Teacher';
    const existingClassTeacherData = allocateList.find(item => item.role === 'Class Teacher');

    if (isClassTeacher && existingClassTeacherData) {
      // Display confirmation message
      const [action] = await AlertConfirm("He/She already allocated as a Class Teacher. Are you sure you want to replace it? This will delete the previous data.");

      if (action) {
        // User confirmed, filter out the existing class teacher data
        const updatedList = allocateList.filter(item => item.role !== 'Class Teacher');
        // Add the new class teacher data
        setAllocateList([...updatedList, { id: uuid(), ...allocateDetails }]);
        setAllocateDetails({ ...initialValue });
      }
    } else {
      // Role is not 'Class Teacher' or there's no existing data for 'Class Teacher', proceed as usual
      // Check if the data is already allocated for the selected class, section, and role
      const isDataAlreadyAllocatedForSelectedClass = isDataAlreadyAllocated(allocateDetails.className, allocateDetails.section, allocateDetails.role);
      if (isDataAlreadyAllocatedForSelectedClass) {
        // Display an alert to the user
        AlertConfirm("Same class-section and subject is already allocated for another teacher.please select different one")
      } else {
        // Add the new allocation details
        setAllocateList(prev => [...prev, { id: uuid(), ...allocateDetails }]);
        setAllocateDetails({ ...initialValue });
      }
    }
  };


  const getData = async (id) => {
    try {
      let { status, result } = await getSingleteacher(id)
      if (status === true) {
        setFormValue(result);
        const subs = result.subjects;
        const subArr = subs.split(",");
        setTeacherHandles([...subArr]);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  useEffect(() => {
    getData(Id)
      ;
  }, []);

  const getClass = async () => {
    try {
      const Classdata = {
        teacherId: teacherId
      }
      let { status, result } = await findClass(Classdata)
      if (status === true) {
        setAllocateList(result.status)
      }
    } catch (err) {
      console.log(err, '--err')
    }
  }
  useEffect(() => {
    getClass()
  }, [teacherId])
  const getWholeClass = async () => {
    try {
      let { status, result } = await findWholeClass()
      if (status === true) {
        setWholeclass(result)
      }
    } catch (err) {
      console.log(err, '--err')
    }
  }
  useEffect(() => {
    getWholeClass()
  }, [])
  console.log(wholeClass, '----wclass')
  const handleSubmit = async () => {
    const data = {
      name,
      teacherId,
      status: allocateList
    }

    setAllocateList([])

    try {
      let { status, message } = await teacherAllocation(data);
      if (status === true) {
        setFormValue({});
        toastAlert("success", message);
        navigate(`/teacherview`);
      }
    } catch (err) {
      console.log(err, "...err");
    }
  };


  function renderTableView() {

    const handleDel = (id) => {
      const updatedList = allocateList.filter(item => item.id !== id)
      setAllocateList(updatedList)
    }

    //confirmation pop-up box
    const openBasic = async (Id) => {
      const [action] = await AlertConfirm("Are you sure, you want to delete it");
      // action
      if (action) {
        handleDel(Id);
      }
    };
    return (
      <div className="teacher-allocate-table">
        <Table striped bordered hover stickyHeader>
          <thead>
            <tr>
              <th>Grade</th>
              <th>Role</th>
              <th>Subject</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allocateList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{`${item.className} - ${item.section}`}</td>
                  <td>{item.role}</td>
                  <td>{item.subjects}</td>
                  <td className="text-center">
                    <button type="button" className="del-btn" onClick={() => openBasic(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    );
  }

  const handleError = (e) => {
    let name = e.target.name
    if (allocateDetails[name] === '') {
      setErrorMsg(prev => ({ ...prev, [e.target.name]: true }))
    } else {
      setErrorMsg(prev => ({ ...prev, [e.target.name]: false }))
    }
  }

  const disableAddBtn = role !== '' && subjects !== '' && className !== '' && section !== ''

  console.log(errorMsg, "mohan")


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
              <div className="teacher-allocation-input">
                <label htmlFor="teacherName">
                  Teacher Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  readOnly
                />
              </div>
              <div className="teacher-allocation-input">
                <label htmlFor="teacherId">
                  Teacher ID<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="teacherId"
                  value={teacherId}
                  readOnly
                />
              </div>
              <div className="teacher-allocation-input">
                <label htmlFor="class">
                  Class <sup>*</sup>
                </label>
                <select
                  name="className"
                  value={className}
                  onChange={handleInputValue}
                  onBlur={handleError}
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
                {errorMsg.className && <span className="text-error">Please Select Class*</span>}
              </div>
              <div className="teacher-allocation-input">
                <label htmlFor="section">
                  Section<sup>*</sup>
                </label>
                <select
                  name="section"
                  value={section}
                  onChange={handleInputValue}
                  onBlur={handleError}
                >
                  <option value="">Select</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                  <option>F</option>
                </select>
                {errorMsg.section && <span className="text-error">Please Select Section*</span>}
              </div>
              <div className="teacher-allocation-input">
                <label htmlFor="role">
                  Teacher Role<sup>*</sup>
                </label>
                <select
                  name="role"
                  value={role}
                  onChange={handleInputValue}
                  onBlur={handleError}
                >
                  <option value="">Select</option>
                  <option>Class Teacher</option>
                  <option>Subject Teacher</option>
                </select>
                {errorMsg.role && <span className="text-error">Please Select Role*</span>}
              </div>
              <div className="teacher-allocation-input">
                <label htmlFor="subjects">
                  Teacher Handling Subjects<sup>*</sup>
                </label>
                <select
                  name="subjects"
                  value={subjects}
                  onChange={handleInputValue}
                  onBlur={handleError}
                >
                  <option value="">Select</option>
                  {teacherHandles.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
                {errorMsg.subjects && <span className="text-error">Please Select Subjects*</span>}
              </div>
              <div className="teacher-allocation-btn">
                <button type="button" onClick={handleAdd} disabled={!disableAddBtn} style={{ backgroundColor: disableAddBtn ? null : "gray" }}>
                  Add
                </button>
              </div>
            </form>
            {renderTableView()}
            <div className="teacher-allocation-btn">
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeacherAllocation;

