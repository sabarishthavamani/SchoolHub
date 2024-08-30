import React, { useEffect, useState } from "react";

// Components
import TeacherHeader from "./components/teachernavbar";
import TeacherSidebar from "./components/teachersidebar";

// Actions
import {
  DailyBusAttendancePost,
  Dailyattendance,
  displayAttendanceData,
  displayBusAttendanceData,
  findBusAttendance,
  findsection,
  updateBusAttendance,
  updateDailyattendance,
} from "../actions/teacherAction";

import {
  displayBusAllocation,
  getAllVehicle,
  viewDriver,
  viewStudent,
  viewTeacher,
} from "../actions/adminAction";

// Lib
import toastAlert from "../lib/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DriverSidebar from "./components/driversidebar";
import DriverHeader from "./components/driverheader";

const initialFormValue = {
  date: "",
  attendance: "",
};

const BusAttendanceSheet = () => {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [attendanceRecord, setAttendanceRecord] = useState({});
  const [data, setData] = useState([]);
  const [statusUpdate, setstatusUpdate] = useState([]);
  const [attendancecheck, setattendancecheck] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userSearchInput, setuserSearchInput] = useState("");
  const [isGenerateClicked, setIsGenerateClicked] = useState(false);

  const [busRouteDetails, setbusRouteDetails] = useState({});
  const [teacherDisplay, setteacherDisplay] = useState([]);
  const [studentDisplay, setstudentDisplay] = useState([]);
  const [driverDisplay, setdriverDisplay] = useState([]);
  const [busAllocateDisplay, setbusAllocateDisplay] = useState([]);

  const [diverId] = useState(JSON.parse(localStorage.getItem("DRIVER_DATA")));
  //   const DriverId = diverId.diverId;
  const DriverId = "D0002";

  const handleDriverInfo = async () => {
    const teacher = await viewTeacher();
    const student = await viewStudent();
    const driver = await viewDriver();
    const busAllocate = await displayBusAllocation();
    const teacherData = teacher.result;
    const studentData = student.result;
    const driverDisplayData = driver.result;
    const busDisplay = busAllocate.result;

    console.log(driverDisplayData, "driverdata....");
    console.log(busDisplay, "busDisplay....");
    console.log('teacherData----------',teacherData);

    let busRouteData = busDisplay.find(
      (eachItem) => eachItem.attenderId === DriverId
    );

    console.log(busRouteData, "vehicleDetails2....");

    setbusRouteDetails(busRouteData);
    setteacherDisplay(teacherData);
    setstudentDisplay(studentData);
    setdriverDisplay(driverDisplayData);
    setbusAllocateDisplay(busDisplay);
  };


  const teachFilter = teacherDisplay.filter(
    (eachItem) =>
      eachItem.vehicleRoute === busRouteDetails.vehicleRoute &&
      eachItem.teacherId.toLowerCase().includes(userSearchInput.toLowerCase())
  );
  console.log('teacherDisplay............',teacherDisplay);
  const studentFilter = studentDisplay.filter(
    (eachItem) =>
      eachItem.vehicleRoute === busRouteDetails.vehicleRoute &&
      eachItem.studentId.toLowerCase().includes(userSearchInput.toLowerCase())
  );
  const driverFilter = driverDisplay.find(
    (eachItem) => eachItem.vehicleRoute === busRouteDetails.vehicleRoute
  );
  const attenderFilter = busAllocateDisplay.find(
    (eachItem) => eachItem.vehicleRoute === busRouteDetails.vehicleRoute
  );

  console.log(studentFilter, "studentFilter...");
  console.log(teachFilter, "teacherFiler...");
  const passengerData = [...studentFilter, ...teachFilter];

  useEffect(() => {
    handleDriverInfo();
    getAttendance();
  }, []);

  const { admissiongrade, section, date, attendance, checkbox1, checkbox2 } =
    formValue;

  const handlePresent = (id, status) => {
    setAttendanceRecord((prevState) => ({ ...prevState, [id]: status }));
  };

  const handleAbsent = (id, status) => {
    setAttendanceRecord((prevState) => ({ ...prevState, [id]: status }));
  };

  const handleSearchInput = (e) => {
    setuserSearchInput(e.target.value);
    console.log("Search input:", e.target.value);
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
    if (formValue.date === "") {
      toastAlert("warning", "please select the date");
      return null;
    }
    try {
      const disData = await displayBusAttendanceData();
      const checkAttendance = disData.result;
      const dateCheck = checkAttendance.filter(
        (allData) => allData.date === formValue.date
      );
      console.log(checkAttendance, "checkAttendance....");
      console.log(dateCheck, "dateCheck....");
      console.log(formValue.date, "formvalueDate....");
      setData(dateCheck);
      setattendancecheck(dateCheck);
      setIsDateSelected(true);
      setIsGenerateClicked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const filterPassenger = data
    .map((item) =>
      item.attendance.filter((attendanceItem) =>
        attendanceItem.passengerId
          .toLowerCase()
          .includes(userSearchInput.toLowerCase())
      )
    )
    .filter((filteredItems) => filteredItems.length > 0);

  console.log(filterPassenger, "filterPassenger....");

  console.log(data, "---data..ooo....ooo...");
  console.log(attendancecheck, "---check");

  const getAttendance = async () => {};

  const handleSubmit = async () => {
    // Create an array to hold attendance data
    const attendanceData = passengerData.map((item) => ({
      passengerName: item.name,
      passengerId: item.studentId ? item.studentId : item.teacherId,
      status:
        attendanceRecord[item.studentId ? item.studentId : item.teacherId] ||
        "absent", // Default to absent if status is not selected
    }));

    console.log(attendanceData, "attendanceData....,,,///,,,...");
    // Prepare the data to be sent to the server
    const Data = {
      date: date,
      attendance: [...attendanceData],
    };
    try {
      const { status, message } = await DailyBusAttendancePost(Data);

      if (status === true) {
        setFormValue(initialFormValue);
        setAttendanceRecord({});
        setData([]);
        setIsDateSelected(false);
        toastAlert("success", message);
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isButtonDisable =
    passengerData.length > 0
      ? passengerData.length === Object.values(attendanceRecord).length
      : null;

  console.log(attendanceRecord, "attendanceRecord....");
  console.log(passengerData, "data65416+....");
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
      let { status, result, errors, message } =
        await displayBusAttendanceData();
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
          (student) => student.passengerId === studentId
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
          <button className="p-a prs" onClick={handleEditSubmit}>
            {" "}
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="p-a abs" onClick={handleCancelEdit}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
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
      let { status, result, errors, message } =
        await displayBusAttendanceData();
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
      (student) => student.passengerId === editMode
    );

    if (!editedStudent) {
      console.error("Edited student not found in selected attendance record");
      return;
    }

    // Update the status of the edited student
    editedStudent.status = selectedStatus;

    // Prepare the updated attendance data to be sent to the server
    const updatedData = {
      date: selectedAttendance.date,
      attendance: selectedAttendance.attendance,
      id: selectedAttendance._id, // Assuming the id of the attendance document is stored in selectedAttendance._id
      passengerId: editMode, // The studentId being edited
      status: selectedStatus, // The new status for the edited student
    };

    try {
      const { status, message } = await updateBusAttendance(updatedData);

      if (status === true) {
        // Update the state only for the edited student
        setData((prevData) => {
          const newData = [...prevData];
          const studentIndex = newData[0].attendance.findIndex(
            (student) => student.passengerId === editMode
          );
          console.log(studentIndex, "studentIndex...");
          if (studentIndex !== -1) {
            newData[0].attendance[studentIndex].status = selectedStatus;
          }
          return newData;
        });
        getData();
        setEditMode(false);

        toastAlert("success", message);
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="attendance">
      <DriverHeader />
      <div className="attendance-content">
        <DriverSidebar />
        <div className="att-sheet">
          <div className="class-details">
            <div className="std-class">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
              />
              <span className="attendance-error">{inputErrors.date}</span>
            </div>

            <button className="sheet-button" type="button" onClick={getData}>
              Generate Sheet
            </button>

            {formValue.date !== "" && isGenerateClicked && (
              <div className="std-class">
                <input
                  type="search"
                  placeholder="search"
                  style={{ height: "33px", marginTop: "20px", padding: "10px" }}
                  onChange={handleSearchInput}
                  value={userSearchInput}
                />
              </div>
            )}
          </div>
          <div className="att-record">
            <p>Attendance Sheet</p>
            <table className="sheet">
              <thead>
                <tr className="sheet-head">
                  {data.length === 0 && (
                    <th>
                      <span className="p-a prs">P</span>
                      <span className="p-a abs">A</span>
                    </th>
                  )}
                  <th>Passenger Type</th>
                  <th>Passenger ID</th>
                  <th>Passenger Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isDateSelected &&
                  (filterPassenger && filterPassenger.length > 0 ? (
                    filterPassenger[0].map((attendanceItem, key) => (
                      <tr className="sheet-body" key={key}>
                        <td>
                          {attendanceItem.passengerId.startsWith("G")
                            ? "Student "
                            : "Teacher "}
                        </td>
                        <td>
                          {attendanceItem.passengerId.startsWith("G")
                            ? attendanceItem.passengerId
                            : attendanceItem.passengerId}
                        </td>
                        <td>{attendanceItem.passengerName}</td>
                        <td>
                          {editMode === attendanceItem.passengerId ? (
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
                                attendanceItem.status === "present"
                                  ? "present"
                                  : "absent"
                              }
                            >
                              {attendanceItem.status}
                            </span>
                          )}
                        </td>
                        <td className="edit" id="ed">
                          <div className="dropdown">
                            {renderIcon(attendanceItem.passengerId)}
                            {renderActionButtons(attendanceItem.passengerId)}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : data && data.length > 0 && userSearchInput === "" ? (
                    data.map((item, key) =>
                      item.attendance.map((attendanceItem, index) => (
                        <tr className="sheet-body" key={`${key}-${index}`}>
                          <td>
                            {attendanceItem.passengerId.startsWith("G")
                              ? "Student "
                              : "Teacher "}
                          </td>
                          <td>
                            {attendanceItem.passengerId.startsWith("G")
                              ? attendanceItem.passengerId
                              : attendanceItem.passengerId}
                          </td>
                          <td>{attendanceItem.passengerName}</td>
                          <td>
                            {editMode === attendanceItem.passengerId ? (
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
                                  attendanceItem.status === "present"
                                    ? "present"
                                    : "absent"
                                }
                              >
                                {attendanceItem.status}
                              </span>
                            )}
                          </td>
                          <td className="edit" id="ed">
                            <div className="dropdown">
                              {renderIcon(attendanceItem.passengerId)}
                              {renderActionButtons(attendanceItem.passengerId)}
                            </div>
                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    // Render passengerData when data is empty
                    <>
                      {studentFilter.length > 0 && (
                        <div className="att-record">
                          <thead>
                            <p style={{ textAlign: "center" }}>Students</p>
                          </thead>
                        </div>
                      )}
                      {/* Render student list */}
                      {studentFilter.map((item, key) => (
                        <tr className="sheet-body" key={key}>
                          <td>
                            <label
                              className="lab"
                              style={{ marginRight: "8px" }}
                            >
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handlePresent(
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId,
                                    "present"
                                  )
                                }
                                checked={
                                  attendanceRecord[
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId
                                  ] === "present"
                                }
                              />
                              <span className="checking"></span>
                            </label>
                            <label className="lab">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleAbsent(
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId,
                                    "absent"
                                  )
                                }
                                checked={
                                  attendanceRecord[
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId
                                  ] === "absent"
                                }
                              />
                              <span className="cross"></span>
                            </label>
                          </td>
                          <td>{item.studentId ? "Student " : "Teacher "}</td>
                          <td>
                            {item.studentId ? item.studentId : item.teacherId}
                          </td>
                          <td>{item.name}</td>
                          <td>
                            <span
                              className={
                                attendanceRecord[
                                  item.studentId
                                    ? item.studentId
                                    : item.teacherId
                                ]
                                  ? attendanceRecord[
                                      item.studentId
                                        ? item.studentId
                                        : item.teacherId
                                    ] === "present"
                                    ? "present"
                                    : "absent"
                                  : null
                              }
                            >
                              {attendanceRecord[
                                item.studentId ? item.studentId : item.teacherId
                              ]
                                ? attendanceRecord[
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId
                                  ] === "present"
                                  ? "Present"
                                  : "Absent"
                                : null}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {teachFilter.length > 0 && (
                        <div className="att-record">
                          <thead>
                            <p style={{ textAlign: "center" }}>Teachers</p>
                          </thead>
                        </div>
                      )}
                      {/* Render teacher list */}
                      {teachFilter.map((item, key) => (
                        <tr className="sheet-body" key={key}>
                          <td>
                            <label
                              className="lab"
                              style={{ marginRight: "8px" }}
                            >
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handlePresent(
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId,
                                    "present"
                                  )
                                }
                                checked={
                                  attendanceRecord[
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId
                                  ] === "present"
                                }
                              />
                              <span className="checking"></span>
                            </label>
                            <label className="lab">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleAbsent(
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId,
                                    "absent"
                                  )
                                }
                                checked={
                                  attendanceRecord[
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId
                                  ] === "absent"
                                }
                              />
                              <span className="cross"></span>
                            </label>
                          </td>
                          <td>{item.teacherId ? "Teacher " : "Student "}</td>
                          <td>
                            {item.studentId ? item.studentId : item.teacherId}
                          </td>
                          <td>{item.name}</td>
                          <td>
                            <span
                              className={
                                attendanceRecord[
                                  item.studentId
                                    ? item.studentId
                                    : item.teacherId
                                ]
                                  ? attendanceRecord[
                                      item.studentId
                                        ? item.studentId
                                        : item.teacherId
                                    ] === "present"
                                    ? "present"
                                    : "absent"
                                  : null
                              }
                            >
                              {attendanceRecord[
                                item.studentId ? item.studentId : item.teacherId
                              ]
                                ? attendanceRecord[
                                    item.studentId
                                      ? item.studentId
                                      : item.teacherId
                                  ] === "present"
                                  ? "Present"
                                  : "Absent"
                                : null}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
              </tbody>
            </table>
          </div>
          {data.length === 0 && userSearchInput === "" && (
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

export default BusAttendanceSheet;
