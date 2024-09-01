import React, { useEffect, useState } from "react";

// Components
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";

// Actions
import {
  Dailyattendance,
  displayAttendanceData,
  findsection,
  updateDailyattendance,
} from "../actions/teacherAction";

// Lib
import toastAlert from "../lib/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faEllipsis,faTimes } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const initialFormValue = {
  admissiongrade: "",
  section: "",
  date: "",
  attendance: "",
};
const initialAttendance = {
  date: new Date().toLocaleDateString(),
  attendance: [],
};

const StudentAttendance = () => {
  const [attendanceRecord, setAttendanceRecord] = useState({});
  const [data, setData] = useState([]);
  const [statusUpdate, setstatusUpdate] = useState([]);
  const [attendancecheck, setattendancecheck] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const { admissiongrade, section, date, attendance, checkbox1, checkbox2 } =
    formValue;

  const handlePresent = (id, status) => {
    setAttendanceRecord((prevState) => ({ ...prevState, [id]: status }));
  };

  const handleAbsent = (id, status) => {
    setAttendanceRecord((prevState) => ({ ...prevState, [id]: status }));
  };

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
      let Data = {
        admissiongrade: admissiongrade,
        section: section,
        date: date,
      };
      let { status, result, errors, message, result2 } = await findsection(
        Data
      );
      if (status === true) {
        setData(result);
        console.log('result999999999999999',result);
        console.log('result2',result2);
        setattendancecheck(result2);
      }
      if (status === false) {
        if (errors) {
          setErrors(errors);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            admissiongrade: errors.admissiongrade,
            section: errors.section,
            date: errors.date,
          }));
        } else if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log(attendancecheck, "---check");

  const handleSubmit = async () => {
    if (data && data.length > 0) {
      console.log(data, "data...");
      // Create an array to hold attendance data
      const attendanceData = data[0].students.map((item) => ({
        studentName: item.name,
        studentId: item.studentId,
        status: attendanceRecord[item.studentId] || "absent", // Default to absent if status is not selected
      }));

      // Prepare the data to be sent to the server
      const Data = {
        admissiongrade: admissiongrade,
        section: section,
        date: date,
        attendance: [...attendanceData],
      };
      try {
        const { status, message } = await Dailyattendance(Data);

        if (status === true) {
          setFormValue(initialFormValue);
          setAttendanceRecord({});
          setData([]);
          toastAlert("success", message);
        } else if (status === false) {
          toastAlert("error", message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toastAlert("error", "No student data available");
    }
  };
  const isButtonDisable =
    data.length > 0
      ? data[0].students.length === Object.values(attendanceRecord).length
      : null;

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log(status, "ena irrukum ");
  };

  console.log(selectedStatus, "status....");

  const handleEdit = async (studentId) => {
    try {
      let { status, result, errors, message } = await displayAttendanceData();
      if (status === true) {
        setstatusUpdate(result);
        const selectedAttendance = result.find(
          (record) => record.date === date
        );
        if (!selectedAttendance) {
          console.error("Selected attendance record not found");
          return;
        }
        const editedStudent = selectedAttendance.attendance.find(
          (student) => student.studentId === studentId
        );
        if (!editedStudent) {
          console.error(
            "Edited student not found in selected attendance record"
          );
          return;
        }
        setSelectedStatus(editedStudent.status);
        setEditMode(studentId);
      }
      if (status === false) {
        if (errors) {
          setErrors(errors);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            admissiongrade: errors.admissiongrade,
            section: errors.section,
            date: errors.date,
          }));
        } else if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderActionButtons = (studentId) => {
    if (editMode === studentId) {
      return (
        <>
          <button className="p-a prs" onClick={handleEditSubmit}> <FontAwesomeIcon icon={faCheck} /></button>
          <button className="p-a abs" onClick={handleCancelEdit}><FontAwesomeIcon icon={faTimes} /></button>
        </>
      );
    }
    return null;
  };

  const renderIcon = (studentId) => {
    if (editMode !== studentId) {
      return (
       
        <i
        className="fa fa-pencil"

          onClick={() => handleEdit(studentId)}
          style={{ color: "blue", cursor: "pointer" }}
        />
      );
    }
    return null;
  };

  const handleEditSubmit = async () => {
    // Find the attendance record for the selected date
    try {
      let { status, result, errors, message } = await displayAttendanceData();
      if (status === true) {
        setstatusUpdate(result);
      }
      if (status === false) {
        if (errors) {
          setErrors(errors);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            admissiongrade: errors.admissiongrade,
            section: errors.section,
            date: errors.date,
          }));
        } else if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {
      console.error(err);
    }
    const selectedAttendance = statusUpdate.find(
      (record) => record.date === date
    );
  
    if (!selectedAttendance) {
      console.error("Selected attendance record not found");
      return;
    }
  
    // Find the student being edited in the attendance record
    const editedStudent = selectedAttendance.attendance.find(
      (student) => student.studentId === editMode
    );
  
    if (!editedStudent) {
      console.error("Edited student not found in selected attendance record");
      return;
    }
  
    // Update the status of the edited student
    editedStudent.status = selectedStatus;
  
    // Prepare the updated attendance data to be sent to the server
    const updatedData = {
      admissiongrade: admissiongrade,
      section: section,
      date: selectedAttendance.date,
      attendance: selectedAttendance.attendance,
      id: selectedAttendance._id, // Assuming the id of the attendance document is stored in selectedAttendance._id
      studentId: editMode, // The studentId being edited
      status: selectedStatus, // The new status for the edited student
    };
  
    try {
      const { status, message } = await updateDailyattendance(updatedData);
  
      if (status === true) {
        // Update the state only for the edited student
        setData((prevData) => {
          const newData = [...prevData];
          const studentIndex = newData[0].students.findIndex(
            (student) => student.studentId === editMode
          );
          newData[0].students[studentIndex].status = selectedStatus;
          return newData;
        });
        getData()
        setEditMode(false);
  
        toastAlert("success", message);
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  
  
/////////////////////////


const [selectAll, setSelectAll] = useState(false);
const [selectedData, setSelectedData] = useState([]);
const [attendanceRec, setAttendance] = useState(initialAttendance);
const [multiOption, setMultiOption] = useState('')
  const [provideAttendance, setProvideAttendance] = useState(false);

const handleMultiSelect = (e) => {
  if (selectAll) {
    setMultiOption(e.target.value)

  switch (e.target.value) {
    case 'Present':
      const presentData = selectedData.map((each) => ({
        ...each,
        status: "Present",
      }));
      setAttendance((prev) => ({ ...prev, attendance: [...presentData] }));
      break;
    case 'Absent':
      const absentData = selectedData.map((each) => ({
        ...each,
        status: "Absent",
      }));
      setAttendance((prev) => ({ ...prev, attendance: [...absentData] }));
      break;
    case 'Holiday':
      const holidayData = selectedData.map((each) => ({
        ...each,
        status: "Holiday",
      }));
      setAttendance((prev) => ({ ...prev, attendance: [...holidayData] }));
      break;
    default:
      
      return setAttendance(initialAttendance);
  }
  }
}

  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />    
        <div className="att-sheet">
      
        <h2 className="dashboard-title">Driver Details</h2>
          <div className="att-record" style={{marginTop:"10px"}}>
            <p>Attendance Sheet</p>
            <table className="sheet">
              <thead>
                <tr className="sheet-head">
                  {attendancecheck && attendancecheck ? null : (
                    <th>
                      <span className="p-a prs">P</span>
                      <span className="p-a abs">A</span>
                    </th>
                  )}
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data[0].students.map((item, key) => {
                    const checkstatus =
                      attendancecheck && attendancecheck
                        ? attendancecheck.attendance.find(
                            (status) => item.studentId === status.studentId
                          )
                        : null;
                    console.log(checkstatus, "---item");
                    return (
                      <tr className="sheet-body" key={key}>
                        {checkstatus && checkstatus ? (
                          <>
                            <td>{checkstatus.studentName}</td>
                            <td>{checkstatus.studentId}</td>
                            <td>
                              {editMode === item.studentId ? (
                                  <select
                                    value={selectedStatus}
                                    className={
                                      selectedStatus === "present"
                                        ? "present"
                                        : "absent"
                                    }
                                    onChange={(e) =>
                                      handleStatusChange(e.target.value)
                                    }
                                  >
                                    <option value="present">present</option>
                                    <option value="absent">absent</option>
                                  </select>
                              ) : (
                                <span
                                  className={
                                    checkstatus.status === "present"
                                      ? "present"
                                      : "absent"
                                  }
                                >
                                  {checkstatus.status}
                                </span>
                              )}
                            </td>
                            <td className="edit" id="ed">
                              <div className="dropdown">
                                
                                {renderIcon(item.studentId)}
                                {renderActionButtons(item.studentId)}
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              <label
                                className="lab"
                                style={{ marginRight: "8px" }}
                              >
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    handlePresent(item.studentId, "present")
                                  }
                                  checked={
                                    attendanceRecord[item.studentId] ===
                                    "present"
                                  }
                                />
                                <span className="checking"></span>
                              </label>
                              <label className="lab">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    handleAbsent(item.studentId, "absent")
                                  }
                                  checked={
                                    attendanceRecord[item.studentId] ===
                                    "absent"
                                  }
                                />
                                <span className="cross"></span>
                              </label>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.studentId}</td>
                            <td>
                              <span
                                className={
                                  attendanceRecord[item.studentId]
                                    ? attendanceRecord[item.studentId] ===
                                      "present"
                                      ? "present"
                                      : "absent"
                                    : null
                                }
                              >
                                {attendanceRecord[item.studentId]
                                  ? attendanceRecord[item.studentId] ===
                                    "present"
                                    ? "Present"
                                    : "Absent"
                                  : null}
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {attendancecheck && attendancecheck ? null : (
            <button
              className="sheet-submit"
              disabled={!isButtonDisable}
              style={{ backgroundColor: isButtonDisable ? "#ff3672" : "gray" }}
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;