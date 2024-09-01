import React, { useState, useEffect } from "react";
import { viewMeeting } from "../actions/teacherAction";
import Sidebar from "./components/sidebar";

const AllMeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState("");
  const [userSearchInput, setUserSearchInput] = useState({ class: "", section: "", studentName: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingData = await viewMeeting();
        setMeetings(meetingData.result);
        const meetingFile = meetingData.imageUrl;
        setIMAGE_URL(meetingFile);
        console.log(meetingData.result,'meetingData...');
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSearchInput = (field, value) => {
    setUserSearchInput({ ...userSearchInput, [field]: value });
  };

  let filteredMeetings = [];
  if (userSearchInput.class && userSearchInput.section ||userSearchInput.class && userSearchInput.section && userSearchInput.studentName) {
    filteredMeetings = meetings.filter(meeting => {
      const classMatch = meeting.className.toLowerCase().includes(userSearchInput.class.toLowerCase());
      const sectionMatch = meeting.section.toLowerCase().includes(userSearchInput.section.toLowerCase());
      const studentNameMatch = meeting.studentName.toLowerCase().includes(userSearchInput.studentName.toLowerCase());
      return classMatch && sectionMatch && studentNameMatch;
    });
  }

  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Meeting Details</p>
          </div>
          <div className="middle-header-right">
            <div className="teacher-schedule-controls">
              <div className="teacher-schedule-input class-section-input"
                >
                <p style={{textAlign:'center',marginRight:'10px'}} >Class</p>
                <input
                style={{width:'120px'}}
                  type="search"
                  placeholder="search"
                  onChange={(e) => handleSearchInput('class', e.target.value)}
                  value={userSearchInput.class}
                />
              </div>
              <div className="teacher-schedule-input class-section-input"
                >
                <p style={{textAlign:'center',marginRight:'10px'}} >Section</p>
                <input
                style={{width:'120px'}}

                  type="search"
                  placeholder="search"
                  onChange={(e) => handleSearchInput('section', e.target.value)}
                  value={userSearchInput.section}
                />
              </div>
              <div className="teacher-schedule-input class-section-input">
                <p style={{textAlign:'center',marginRight:'10px'}} >Student Name</p>
                <input
                style={{width:'120px'}}
                  type="search"
                  placeholder="search"
                  onChange={(e) => handleSearchInput('studentName', e.target.value)}
                  value={userSearchInput.studentName}
                />
              </div>
            </div>
          </div>
        </div>
        {filteredMeetings.length > 0 ? (
          <div className="std-table">
            <table className="std-info">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Student</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeetings.map((meeting) => (
                  <tr className="std-row" style={{ padding: '5px' }} key={meeting._id}>
                    <td>{meeting.name}</td>
                    <td>{meeting.className}</td>
                    <td>{meeting.section}</td>
                    <td>{meeting.studentName}</td>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>{meeting.assignDate}</td>

                    <td>
                      {meeting.fileUploads && (
                        <a
                          href={`${IMAGE_URL}/${meeting.fileUploads}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View File
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
            <div className="std-table" style={{textAlign:'center',marginTop:'50px'}}>
            <table className="std-info">
          <p style={{color:'blue'}}><span style={{fontSize:'large',fontWeight:'bold'}}>No meetings found.</span></p>
            </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default AllMeetingList;
