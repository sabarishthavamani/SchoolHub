import React from "react";

import ParentHeader from "./components/parentheader";
import ParentNavBar from "./components/parentnavbar";

const StudentProfile = () => {
  return (
    <div className="student-profile-page">
      <ParentHeader headerTitle={"Student Profile"} />
      <div className="student-profile-container">
        <div className="student-info-container">
          <div className="student-info-img">
            <img
              src="https://xsgames.co/randomusers/assets/avatars/male/48.jpg"
              alt="student profile"
            />
          </div>
          <div className="student-info-name-class">
            <p>Ajith Kumar</p>
            <p>VI - A</p>
          </div>
        </div>
        <div className="student-detailed-info">
        <h2>Basic Information</h2>
        <table>
          <tr>
            <th>Reg No</th>
            <td>123456</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>12.14.2012</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>Male</td>
          </tr>
          <tr>
            <th>Blood Type</th>
            <td>A+ve</td>
          </tr>
          <tr>
            <th>Bus</th>
            <td>TN 59 0123</td>
          </tr>
          <tr>
            <th>Bus Pick up</th>
            <td>Anna Nagar</td>
          </tr>
        </table>
        <h2>Contact Information</h2>
        <table>
          <tr>
            <th>Father Name</th>
            <td>Subramani R</td>
          </tr>
          <tr>
            <th>Contact No.</th>
            <td>+91 923789244</td>
          </tr>
          <tr>
            <th>Whatsapp No.</th>
            <td>+91 9786248877</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>suba@gmail.com</td>
          </tr>
        </table>
        </div>
      </div>
      <ParentNavBar />
    </div>
  );
};

export default StudentProfile;
