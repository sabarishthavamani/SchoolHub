import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TeacherMenuContext } from "../context/teachermenucontext";
import { IoClose } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { removeAuthRec, removeAuthToken } from "../lib/localstorage";
import ParentHeader from "./components/parentheader";
import ParentNavBar from "./components/parentnavbar";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "./components/teachersidebar";
import TeacherHeader from "./components/teachernavbar";
import DriverHeader from "./components/driverheader";
import DriverSidebar from "./components/driversidebar";

const ProfileDetailsDriver = () => {
  // Context
  const { openMenu, toggleMenu } = useContext(TeacherMenuContext);

  // State
  const [driverInfo, setdriverInfo] = useState("");
  const [navPop, setNavPop] = useState(false);

  console.log(openMenu, "open...", toggleMenu, "toggle...");

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setdriverInfo(JSON.parse(localStorage.getItem("DRIVER_DATA")));
    };
    handleStorageChange();
  }, []);

  const detailHandler = () => {
    setNavPop((prev) => !prev);
  };

  return (
    <div className="dashboard-page">
      <DriverHeader />
      <div className="dashboard-main">
        <DriverSidebar />
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h2 className="dashboard-title">Profile</h2>
            <div
              className="student-profile-container"
              style={{ width: "100%" }}
            >
              <div className="student-info-container">
                <div className="student-info-img">
                  <img src={driverInfo.driverphoto} alt="profile" />
                </div>
                <div className="student-info-name-class">
                  <p>{driverInfo.name}</p>
                  {/* <p>{driverInfo.name}</p> */}
                </div>
              </div>
            </div>
            <div className="student-detailed-info">
              <div className="att-sheet" style={{ width: "100%" }}>
                <div
                  className="student-profile-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className="student-detailed-info"
                    style={{ width: "100%" }}
                  >
                    <h2>Basic Information</h2>
                    <table>
                    <tr>
                        <th>Reg No</th>
                        <td>{driverInfo.teacherId}</td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <td>{driverInfo.name}</td>
                      </tr>
                      <tr>
                        <th>Aadhar Card</th>
                        <td>{driverInfo.aadhaarNumber}</td>
                      </tr>
                    </table>
                    <h2>Contact Information</h2>
                    <table>
                    <tr>
                        <th>Email Id</th>
                        <td>{driverInfo.email}</td>
                      </tr>
                      <tr>
                        <th>Phone Number</th>
                        <td>{driverInfo.phoneNumber}</td>
                      </tr>
                      <tr>
                        <th>Married Status</th>
                        <td>{driverInfo.maritalstatus}</td>
                      </tr>
                      <tr>
                        <th>Date Od Birth</th>
                        <td>{driverInfo.dob}</td>
                      </tr>
                      <tr>
                        <th>Permanent Address</th>
                        <td>{driverInfo.permanentaddress}</td>
                      </tr>
                      <tr>
                        <th>Emergency Contact Number</th>
                        <td>{driverInfo.emergencycontactNumber}</td>
                      </tr>
                    </table>
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

export default ProfileDetailsDriver;
