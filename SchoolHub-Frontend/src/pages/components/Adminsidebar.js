import React, { useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
//import Lib
import { removeAuthRec, removeAuthToken } from "../../lib/localstorage";
//import Context
import { TeacherMenuContext } from "../../context/teachermenucontext";

const AdminSidebar = () => {
  const { openMenu, toggleMenu } = useContext(TeacherMenuContext);
  //hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [expandedDropdown, setExpandedDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setExpandedDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <>
      <div className={`side-menu-content ${openMenu ? "open" : "close"}`}>
        <div className="att-part-one">


          {/* Student */}
          <div className="att-menu">
            <span>STUDENT</span>
            <p
              className="am"
              style={
                expandedDropdown === "student"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => {
                toggleMenu();
                toggleDropdown("student");
              }}
            >
              <Link className="report">
                <img
                  src={`${process.env.PUBLIC_URL}/images/report.png`}
                  alt="report"
                />
                Student Info
                <span>
                  {expandedDropdown === "student" ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropright size={20} />
                  )}
                </span>
              </Link>
            </p>
            {expandedDropdown === "student" && (
              <div
                style={{
                  maxHeight: "100px",
                  overflowY: "scroll",
                }}
              >
                {" "}
                <p
                  className="am"
                  style={
                    pathname === "/newadmission"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/newadmission" className="report ms-3">
                    New Admission
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/students"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/students" className="report ms-3">
                    Student Detail
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/feecollection/${Id}"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/feecollection/${Id}" className="report ms-3">
                    Fees Collection
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/feesetup"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/feesetup" className="report ms-3">
                    {/* <MdAssignment size={25} /> */}
                    Fees Setup
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Teacher */}
          <div className="att-menu">
            <span>TEACHER</span>
            <p
              className="am"
              style={
                expandedDropdown === "teacher"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => {
                toggleMenu();
                toggleDropdown("teacher");
              }}
            >
              <Link className="report">
                <img
                  src={`${process.env.PUBLIC_URL}/images/report.png`}
                  alt="report"
                />
                Teacher Info
                <span>
                  {expandedDropdown === "teacher" ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropright size={20} />
                  )}
                </span>
              </Link>
            </p>
            {expandedDropdown === "teacher" && (
              <div
                style={{
                  maxHeight: "100px",
                  overflowY: "scroll",
                }}
              >
                {" "}
                <p
                  className="am"
                  style={
                    pathname === "/teacher"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/teacher" className="report ms-3">
                    Teacher Admission
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/teacherview"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/teacherview" className="report ms-3">
                    Teacher Detail
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Driver */}
          <div className="att-menu">
            <span>Driver</span>
            <p
              className="am"
              style={
                expandedDropdown === "driver"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => {
                toggleMenu();
                toggleDropdown("driver");
              }}
            >
              <Link className="report">
                <img
                  src={`${process.env.PUBLIC_URL}/images/report.png`}
                  alt="report"
                />
                Driver Info
                <span>
                  {expandedDropdown === "driver" ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropright size={20} />
                  )}
                </span>
              </Link>
            </p>
            {expandedDropdown === "driver" && (
              <div
                style={{
                  maxHeight: "100px",
                  overflowY: "scroll",
                }}
              >
                {" "}
                <p
                  className="am"
                  style={
                    pathname === "/driver" ? { backgroundColor: "#f9f6b8" } : {}
                  }
                >
                  <Link to="/driver" className="report ms-3">
                    Driver Admission
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/driverview"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/driverview" className="report ms-3">
                    Driver Detail
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Vehicle */}
          <div className="att-menu" style={{ margin: "auto" }}>
            <span>Vehicle</span>
            <p
              className="am"
              style={
                expandedDropdown === "vehicle"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => {
                toggleMenu();
                toggleDropdown("vehicle");
              }}
            >
              <Link className="report">
                <img
                  src={`${process.env.PUBLIC_URL}/images/report.png`}
                  alt="report"
                />
                Transport
                <span>
                  {expandedDropdown === "vehicle" ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropright size={20} />
                  )}
                </span>
              </Link>
            </p>
            {expandedDropdown === "vehicle" && (
              <div
                style={{
                  maxHeight: "100px",
                  overflowY: "scroll",
                }}
              >
                {" "}
                <p
                  className="am"
                  style={
                    pathname === "/vehicle"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/vehicle" className="report ms-3">
                    Driver Admission
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/vehicleview"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/vehicleview" className="report ms-3">
                    Vehicle List
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/busallocateview"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/busallocateview" className="report ms-3">
                    Bus Allocateview
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Admin */}

          <div className="att-menu" style={{ margin: "auto" }}>
            <span>Employee</span>
            <p
              className="am"
              style={{
                ...(expandedDropdown === "attendance" && {
                  backgroundColor: "#f9f6b8",
                }),
              }}
              onClick={() => {
                toggleMenu();
                toggleDropdown("attendance");
              }}
            >
              <Link className="report">
                <img
                  src={`${process.env.PUBLIC_URL}/images/report.png`}
                  alt="report"
                />
                Employee Details
                <span>
                  {expandedDropdown === "attendance" ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropright size={20} />
                  )}
                </span>
              </Link>
            </p>
            {expandedDropdown === "attendance" && (
              <div
                style={{
                  maxHeight: "100px",
                  overflowY: "scroll",
                }}
              >
                <p
                  className="am"
                  style={
                    pathname === "/PayrolllistGenerate"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/PayrolllistGenerate" className="report ms-3">
                    Payrolllist-Generate
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/payrollList"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/payrollList" className="report ms-3">
                    Payroll-List
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/Employee-attendancegenerate"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link
                    to="/Employee-attendancegenerate"
                    className="report ms-3"
                  >
                    Attendance-Generate
                  </Link>
                </p>

                <p
                  className="am"
                  style={
                    pathname === "/Employee-attendance"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/Employee-attendance" className="report ms-3">
                    Daily-Attendance
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/leaveschedule"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/leaveschedule" className="report ms-3">
                    Leave-Schedule
                  </Link>
                </p>
                <p
                  className="am"
                  style={
                    pathname === "/leaveDetails"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/leaveDetails" className="report ms-3">
                    Leave-List
                  </Link>
                </p>

                <p
                  className="am"
                  style={
                    pathname === "/adminnotificationlist"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                >
                  <Link to="/adminnotificationlist" className="report ms-3">
                    Circular
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>


        
        <button
          data-bs-toggle="tooltip"
          title="Logout!"
          data-bs-placement="right"
          className="teachersignout"
          onClick={() => {
            removeAuthToken();
            removeAuthRec();
            navigate("/teacher-login");
          }}
        >
          Logout
          <span>
            <FontAwesomeIcon icon={faSignOut} />
          </span>
        </button>
      </div>
      <div
        className={`side-menu-overlay ${openMenu ? "open" : "close"}`}
        onClick={() => toggleMenu()}
      ></div>
    </>
  );
};

export default AdminSidebar;
