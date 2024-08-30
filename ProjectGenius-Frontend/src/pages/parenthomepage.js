import React, { useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  MdOutlineRemoveRedEye,
  MdOutlineClass,
  MdOutlineToday,
} from "react-icons/md";
import {
  adminnotificationDisplay,
  allStudentSchedule,
  displayBusAllocation,
  findWholeClass,
  viewDriver,
  viewStudent,
} from "../actions/adminAction";
//import Components
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { displayAttendanceData } from "../actions/teacherAction";
import ParentHeader from "./components/parentheader";
import Parentsidebar from "./components/parentsidebar";
import { IoMdCall } from "react-icons/io";
import TimeTablePopup from "./components/timetablepopup";
import { useNavigate } from "react-router-dom";
import Map from "./components/map";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FaChevronUp } from "react-icons/fa6";

const ParentHomepage = () => {
  //states for Attendance view
  const [IMAGE_URL, setIMAGE_URL] = useState("");

  // Notification

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.toLocaleString("default", { month: "short" });
      const year = formattedDate.getFullYear();
      return `${day} ${month} ${year}`;
    };

    const schedularcurrentDate = formatDate(new Date());
    console.log("Current Date:", schedularcurrentDate);

    try {
      const { status, result, imageUrl } = await adminnotificationDisplay();
      console.log("Date in result:", result);

      if (status) {
        const filteredResult = result.filter(
          (item) => formatDate(item.date) === schedularcurrentDate
        );

        console.log("Filtered result:", filteredResult);

        setIMAGE_URL(imageUrl);
        setData(filteredResult);

        if (filteredResult.length === 0) {
          console.log("There are no values today");
        }
      } else {
        console.log("Error fetching data:", result);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [showBusroute, setshowBusroute] = useState([]);
  const filterVehicleRoute = JSON.parse(localStorage.getItem("PARENT_DATA"));

  const getData = async () => {
    const busRoute = await displayBusAllocation();
    const Busroute = busRoute.result;

    const driverDetails = await viewDriver();
    console.log("driverDetails", driverDetails);

    const filterBusroute = Busroute.filter(
      (item) =>
        item.active === 1 &&
        item.vehicleRoute === filterVehicleRoute.vehicleRoute
    ).map((item) => {
      const attender = item.attender;
      const driverName = item.driverName;
      console.log("driver............", driverName);
      console.log("attender............", attender);

      const att = driverDetails.result.find((att) => att.name === attender);
      const attnum = att ? att.phoneNumber : null;

      const driv = driverDetails.result.find((att) => att.name === driverName);
      const drivnum = driv ? driv.phoneNumber : null;

      const attimg = driverDetails.result.find((att) => att.name === attender);
      const attenderimg = attimg ? attimg.driverphoto : null;

      console.log("drivnum.......", drivnum);
      console.log("driverphoto.......", attenderimg);
      console.log("attnum.......", attnum);
      return {
        ...item,
        attenderPhoneNumber: attnum,
        attenderName: attender,
        driverPhoneNumber: drivnum,
        attenderimg,
      };
    });
    setshowBusroute(filterBusroute);

    console.log(filterBusroute);
  };

  useEffect(() => {
    getData();
  }, []);

  //calendar

  const [dates, setDates] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const { status, result } = await displayAttendanceData();
        if (status) {
          const studentData = JSON.parse(localStorage.getItem("PARENT_DATA"));
          const studentId = studentData ? studentData.studentId : "";

          const studentLeaveData = result.map((item) => ({
            ...item,
            attendance: item.attendance.filter(
              (attendanceItem) => attendanceItem.studentId === studentId
            ),
          }));
          setAttendanceData(studentLeaveData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendanceData();
  }, []);

  const tileContent = ({ date }) => {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const attendanceForDate = attendanceData.find(
      (entry) => entry.date === formattedDate
    );

    if (attendanceForDate) {
      const hasPresent = attendanceForDate.attendance.some(
        (student) => student.status === "present"
      );
      const hasAbsent = attendanceForDate.attendance.some(
        (student) => student.status === "absent"
      );

      if (hasPresent && hasAbsent) {
        return (
          <div style={{ color: "darkorange", fontWeight: "bold" }}>
            Both P and A
          </div>
        );
      } else if (hasPresent) {
        return <div style={{ color: "darkgreen", fontWeight: "bold" }}>P</div>;
      } else if (hasAbsent) {
        return <div style={{ color: "darkred", fontWeight: "bold" }}>A</div>;
      }
    }
    return null;
  };

  //Time Table
  const [studentData] = useState(
    JSON.parse(localStorage.getItem("STUDENT_DATA"))
  );
  const StudentId = studentData ? studentData.studentId : null;

  const [schedule, setSchedule] = useState("");
  const [currentDaySchedule, setCurrentDaySchedule] = useState([]);

  const [showPopup, setShowPopup] = useState({
    teacherTimetable: false,
    teacherAttendance: false,
  });

  //teacher Attendance data
  const getSchedule = async () => {
    try {
      const Scheduledata = {
        StudentId: StudentId,
      };
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

      const viewSchedule = await allStudentSchedule();
      const classTimeTable = viewSchedule.result;
      const filterTimeTable = classTimeTable.find(
        (Name) => Name.teacherName === getTeacher
      );
      const finalTable = filterTimeTable;

      console.log(finalTable, "finalTable...");

      setSchedule(finalTable);
    } catch (err) {
      console.log(err, "---err");
    }
  };
  useEffect(() => {
    getSchedule();
  }, [StudentId]);

  //consolidate timetable popup
  const handleTimetablePopup = () => {
    setShowPopup((prev) => ({
      ...prev,
      teacherTimetable: true,
    }));
  };

  useEffect(() => {
    console.log(schedule, "schedule.........");
    if (schedule && schedule.schedule) {
      const processedData = schedule.schedule.map((dayData) => {
        const { day, periods } = dayData;
        const processedPeriods = Object.values(periods).filter(
          (period) => period.class && period.subject
        );
        return { day, periods: processedPeriods };
      });
      // Get the current day
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      // Filter the processed schedule for the current day
      const currentDayData = processedData.find(
        (dayData) => dayData.day.toLowerCase() === today.toLowerCase()
      );
      setCurrentDaySchedule(currentDayData || []);
    }
  }, [schedule]);

  //Map
  const navigate = useNavigate();
  const [showDirection, setShowDirection] = useState(false);

  const handleShowDirection = () => {
    setShowDirection((prev) => !prev);
  };
  const center = { lat: 9.9221918633909, lng: 78.14943222506953 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAzhUxevvN0IXmaL0gVTLZXN8po6TdiOzc",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [showDirections, setShowDirections] = useState(false);

  const originRef = useRef();
  const destiantionRef = useRef();

  const handleShowDirections = () => {
    setShowDirections((prev) => !prev);
  };

  if (!isLoaded) {
    return <div>Loading!!!!!!!</div>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div className="dashboard-page">
      <ParentHeader />
      <div className="dashboard-main">
        {showPopup.teacherTimetable && (
          <div className="teacher-schedule-pop">
            <div
              className="schedule-pop-overlay"
              onClick={() =>
                setShowPopup((prev) => ({ ...prev, teacherTimetable: false }))
              }
            ></div>
            <div className="schedule-pop-container">
              <TimeTablePopup data={schedule.schedule} />
            </div>
          </div>
        )}
        <Parentsidebar />
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h2 className="dashboard-title">Parent Dashboard</h2>

            <div
              className="dashboard-segments"
              style={{
                height: "400px",
                overflowY: "auto",
                marginBottom: "10px",
                animation: data.length > 0 ? "blinkBlue 1s infinite" : "none",
              }}
            >
               <div className="dashboard-segment-content">
                <div className="tchr-att-header">
                  <h2 style={{ color: "lightgreen" }}>CIRCULAR</h2>
                  <div className="dashboard-segment-content"></div>
                  {data.length === 0 && (
                    <p
                      className="dashboard-reminder"
                      style={{ textAlign: "center" }}
                    >
                      <h1>No circular today</h1>
                    </p>
                  )}
                  {data.map((item, index) => (
                    <div className="dashboard-reminder" key={index}>
                      <ul>
                        <tr>
                          <h4>{item.title}</h4>
                        </tr>
                        <tr style={{ textAlign: "center" }}>
                          <div
                            style={{
                              width: "100px",
                              height: "100px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${IMAGE_URL}/${item.photo}`}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </tr>
                        <tr style={{ textAlign: "left" }}>{item.command}</tr>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-tchr-info">
              <div className="dashboard-segments">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>Attendance Status</p>
                  </div>
                  <div>
                    <Calendar
                      onChange={setDates}
                      value={dates}
                      showNeighboringMonth={false}
                      locale="en-US"
                      tileContent={tileContent}
                    />
                  </div>
                </div>
              </div>

              <div className="dashboard-segments">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>Time Table</p>
                    <div className="header-input-fields">
                      {currentDaySchedule && currentDaySchedule ? (
                        <span>Day:{currentDaySchedule.day}</span>
                      ) : (
                        <span>Day:Sunday</span>
                      )}
                    </div>
                  </div>
                  <div
                    className="tchr-schedule-status"
                    style={{ marginTop: "20%" }}
                  >
                    {currentDaySchedule && currentDaySchedule ? (
                      currentDaySchedule.periods &&
                      currentDaySchedule.periods.length > 0 ? (
                        <ul>
                          {currentDaySchedule.periods.map(
                            (period, periodIndex) => (
                              <li key={periodIndex}>
                                {`${period.class} ${period.section} - ${period.subject}`}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <ul>
                          <li>Free Period</li>
                          <li>Free Period</li>
                          <li>Free Period</li>
                        </ul>
                      )
                    ) : (
                      <ul>
                        <li>It's Holiday Buddy..!</li>
                        <li>It's Holiday Buddy..!</li>
                        <li>It's Holiday Buddy..!</li>
                      </ul>
                    )}
                    <button type="button" onClick={handleTimetablePopup}>
                      <MdOutlineRemoveRedEye />
                      View Time Table
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-stud-info">
              <div className="dashboard-segments stud-mark-analyze-sm">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>Route Map</p>
                    <input
                      type="text"
                      placeholder="origin"
                      className="text-field form-control"
                      ref={originRef}
                    />
                    <input
                      type="text"
                      placeholder="destination"
                      className="text-field form-control"
                      ref={destiantionRef}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={calculateRoute}
                    >
                      Go
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={clearRoute}
                    >
                      Clear
                    </button>
                    <div></div>
                    <p>{`Distance - ${distance}`}</p>
                    <p>{`Duration - ${duration}`}</p>
                    <div style={{ height: "400px", width: "100%" }}>
                      <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{
                          height: "100%",
                          width: "100%",
                        }}
                        onLoad={(map) => setMap(map)}
                      >
                        {/* Render Marker */}
                        <Marker position={center} />
                        {/* Render Directions if available */}
                        {directionsResponse && (
                          <DirectionsRenderer directions={directionsResponse} />
                        )}
                      </GoogleMap>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-segments stud-mark-analyze-sm">
                <div className="dashboard-segment-content">
                  <div className="tchr-att-header">
                    <p>Bus Route Details</p>
                  </div>
                  <div className="dashboard-segments stud-mark-analyze-sm">
                    <div className="dashboard-segment-content">
                      <div className="bus-details-card">
                        <div className="details-card-container">
                          <div>
                            {showBusroute.map((route, index) => (
                              <div key={index}>
                                <p>Number Plate</p>
                                <h6>{route.vehicleRegisterNumber}</h6>
                                <hr />
                                <p>Bus Route</p>
                                <h6>{route.vehicleRoute}</h6>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tchr-att-header">
                    <p>Bus-Incharge Info</p>
                  </div>
                  <div>
                    {showBusroute.map((route, index) => (
                      <div className="dashboard-segments stud-mark-analyze-sm">
                        <div className="dashboard-segment-content">
                          <div className="scl-std">
                            {/* <img
                              src={route.attenderimg}
                              width={"40px"}
                              height={"40px"}
                              style={{ borderRadius: "50%" }}
                              alt="student"
                            /> */}

                            <div className="bus-incharge-details">
                              <div className="bus-incharge-name">
                                <h3>{route.driverName}</h3>
                                <p>Bus Driver</p>
                              </div>
                              <div className="bus-incharge-contact">
                                <IoMdCall />
                                <span>Contact</span>
                                <p>(+91) {route.driverPhoneNumber}</p>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="scl-std">
                            {/* <img
                              src="https://xsgames.co/randomusers/assets/avatars/male/37.jpg"
                              width={"40px"}
                              height={"40px"}
                              style={{ borderRadius: "50%" }}
                              alt="student"
                            /> */}
                            <div className="bus-incharge-details">
                              <div className="bus-incharge-name">
                                <h3>{route.attenderName}</h3>
                                <p>Attendar</p>
                              </div>
                              <div className="bus-incharge-contact">
                                <IoMdCall />
                                <span>Contact</span>
                                <p>(+91) {route.attenderPhoneNumber}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentHomepage;
