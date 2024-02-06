import React, { useState } from "react";
import ParentHeader from "../pages/components/parentheader";
import ParentNavBar from "../pages/components/parentnavbar";
import AttendanceCalender from "../pages/components/attendancecalender";

const BusAttendance = () => {
  return (
    <div className="bus-attendance-page">
      <ParentHeader headerTitle={"Attendance"} />
      <div className="bus-attendance-container">
        <AttendanceCalender />
        <div className="bus-missed-notify-container">
          <div className="bus-missed-notification">
            <p style={{backgroundColor: '#D4FFEA'}}>9</p>
            <div style={{backgroundColor: '#D4FFEA'}} className="notification-message">
              <h3>Pick Up Trip : School Bus Missed</h3>
              <p>Your Child missed the bus, but present at school</p>
            </div>
          </div>
          <div className="bus-missed-notification">
            <p style={{backgroundColor: '#F5F0A0'}}>18</p>
            <div style={{backgroundColor: '#F5F0A0'}} className="notification-message">
              <h3>Pick Up Trip : School Bus Missed</h3>
              <p>Your Child missed the bus, but present at school</p>
            </div>
          </div>
          <div className="bus-missed-notification">
            <p style={{backgroundColor: '#ECE2FF'}}>19</p>
            <div style={{backgroundColor: '#ECE2FF'}} className="notification-message">
              <h3>Drop off Trip : Absent</h3>
              <p>Child Picked at school by parent at Noon</p>
            </div>
          </div>
        </div>
      </div>
      <ParentNavBar />
    </div>
  );
};

export default BusAttendance;
