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

const ProfileDetails = () => {
  // Context
  const { openMenu, toggleMenu } = useContext(TeacherMenuContext);

  // State
  const [teacherInfo, setTeacherInfo] = useState("");
  const [navPop, setNavPop] = useState(false);

  console.log(openMenu, "open...", toggleMenu, "toggle...");

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setTeacherInfo(JSON.parse(localStorage.getItem("TEACHER_DATA")));
    };
    handleStorageChange();
  }, []);

  const detailHandler = () => {
    setNavPop((prev) => !prev);
  };

  return (
    <div className="dashboard-page">
      <TeacherHeader />
      <div className="dashboard-main">
        <TeacherSidebar />
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h2 className="dashboard-title">Profile</h2>

            <div
              className="student-profile-container"
              style={{ width: "100%" }}
            >
              <div className="student-info-container">
                <div className="student-info-img">
                  <img src={teacherInfo.teacherphoto} alt="profile" />
                </div>
                <div className="student-info-name-class">
                  <p>{teacherInfo.name}</p>
                  {/* <p>{teacherInfo.name}</p> */}
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
                        <td>{teacherInfo.teacherId}</td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <td>{teacherInfo.name}</td>
                      </tr>
                      <tr>
                        <th>Aadhar Card</th>
                        <td>{teacherInfo.aadhaarNumber}</td>
                      </tr>
                    </table>
                    <h2>Contact Information</h2>
                    <table>
                    <tr>
                        <th>Email Id</th>
                        <td>{teacherInfo.email}</td>
                      </tr>
                      <tr>
                        <th>Phone Number</th>
                        <td>{teacherInfo.phoneNumber}</td>
                      </tr>
                      <tr>
                        <th>Married Status</th>
                        <td>{teacherInfo.maritalstatus}</td>
                      </tr>
                      <tr>
                        <th>Date Od Birth</th>
                        <td>{teacherInfo.dob}</td>
                      </tr>
                      <tr>
                        <th>Permanent Address</th>
                        <td>{teacherInfo.permanentaddress}</td>
                      </tr>
                      <tr>
                        <th>Emergency Contact Number</th>
                        <td>{teacherInfo.emergencycontactNumber}</td>
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

export default ProfileDetails;
