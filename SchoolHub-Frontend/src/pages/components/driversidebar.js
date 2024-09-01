import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
//import Lib
import { removeAuthRec, removeAuthRecDriver, removeAuthToken } from "../../lib/localstorage";
//import Context
import { TeacherMenuContext } from "../../context/teachermenucontext";
import { IoPersonSharp } from "react-icons/io5";
import { FcLeave } from "react-icons/fc";

const DriverSidebar = () => {
  const { openMenu, toggleMenu } = useContext(TeacherMenuContext);
  //hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [driverInfo, setDriverInfo] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      setDriverInfo(JSON.parse(localStorage.getItem("DRIVER_DATA")));
    };
    handleStorageChange();
  }, []);

  return (
    <>
      <div className={`side-menu-content ${openMenu ? "open" : "close"}`}>
        <div className="att-part-one">
          <div className="att-menu">
            <span>Track</span>
            <p
              className="am"
              style={
                pathname === "/dashboard" ? { backgroundColor: "#f9f6b8" } : {}
              }
              onClick={() => toggleMenu()}
            >
              <Link to="/driver-dashboard">
                <img
                  src={`${process.env.PUBLIC_URL}/images/dashboard.png`}
                  alt="driver-dashboard"
                />
                Dashboard
              </Link>
            </p>
          </div>
          {driverInfo.role === "Attender" && (
            <div className="att-menu">
              <span>Analyze</span>
              <p
                className="am"
                style={
                  pathname === "/teacher-marksheet"
                    ? { backgroundColor: "#f9f6b8" }
                    : {}
                }
                onClick={() => {
                  toggleMenu();
                  setDropdownExpanded(!dropdownExpanded); // Toggle dropdown state
                }}
              >
                <Link className="report">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/report.png`}
                    alt="report"
                  />
                  Student Attendance
                  <span>
                    {dropdownExpanded ? (
                      <IoMdArrowDropdown size={20} />
                    ) : (
                      <IoMdArrowDropright size={20} />
                    )}
                  </span>
                </Link>
              </p>
              {dropdownExpanded && (
                <p
                  className="am"
                  style={
                    pathname === "/bus-attendance-sheet"
                      ? { backgroundColor: "#f9f6b8" }
                      : {}
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Link to="/bus-attendance-sheet" className="report ms-3">
                    <span>
                      <FaRegEdit size={25} />
                    </span>
                    Attendance Generate
                  </Link>
                </p>
              )}
            </div>
          )}

          <div className="att-menu">
            <span>Manage</span>

            <p
              className="am"
              style={
                pathname === "/driverleaveappliedlist"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
            >
              <Link to="/driverleaveappliedlist" className="child">
                <span>
                  <FcLeave size={25} />
                </span>
                Leave List
              </Link>
            </p>

            <p
              className="am"
              style={
                pathname === "/teacher-student"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
            >
              <Link to="/profile-detailsDriver" className="child">
                <span>
                  <IoPersonSharp size={25} />
                </span>
                Profile
              </Link>
            </p>
          </div>
        </div>
        <button
          data-bs-toggle="tooltip"
          title="Logout!"
          data-bs-placement="right"
          className="teachersignout"
          onClick={() => {
            removeAuthToken();
            removeAuthRecDriver();
            navigate("/driver-login");
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
export default DriverSidebar;
