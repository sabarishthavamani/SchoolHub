import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../src/reactcalendar.css";
import {
  findAllSection,
  findWholeClass,
  viewStudent,
} from "../actions/adminAction";
import { viewMeeting } from "../actions/teacherAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "react-alert-confirm";
import ParentHeader from "./components/parentheader";
import Parentsidebar from "./components/parentsidebar";

const localizer = momentLocalizer(moment);

const MeetingScheduler = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [IMAGE_URL, setIMAGE_URL] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const parentData = JSON.parse(localStorage.getItem("PARENT_DATA"));
        const parentId = parentData ? parentData.studentId : "";
    
        const findSection = await findAllSection();
        const studData = findSection.result;
        const getAdmissiongrade = studData.filter(
          (data) => data.admissiongrade === parentData.admissiongrade
        );
        const getStudent = getAdmissiongrade.find((section) =>
          section.students.some((student) => student.studentId === parentId)
        );
        console.log(parentData,'parentData...');
        console.log(getStudent,'getStudent...');
        const MeetingData = await viewMeeting();
        const meeting = MeetingData.result;
        const meetingFile = MeetingData.imageUrl;
        setIMAGE_URL(meetingFile);
    
        const findMeeting = meeting.filter(
          (data) =>
            data.className === getStudent.admissiongrade && 
            data.section === getStudent.section
        );
        console.log(findMeeting,'findMeeting...');

        const selectedStudentMeeting = findMeeting.filter((data)=>data.studentName === parentData.name || data.studentName === 'All Students')

        console.log(selectedStudentMeeting,'selectedStudentMeeting...');
    
        const events = selectedStudentMeeting.map((meeting) => ({
          title: meeting.title, // or any other appropriate title
          start: new Date(meeting.assignDate),
          end: new Date(meeting.assignDate), // Set end date to start date for now, adjust as needed
          description: meeting.description,
          fileUploads: meeting.fileUploads,
          studentName:meeting.studentName
        }));
        
    
        setEvents(events);
      } catch (err) {
        console.error(err);
      }
    };
    

    getData();
  }, []);

  console.log(selectedEvent, "event.....");

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";
    let title = event.subject;
    const descriptionLength = 30; // Set your desired character limit

    const shortDescription =
      event.description.length > descriptionLength
        ? event.description.substring(0, descriptionLength) + "..."
        : event.description;

    return {
      style: {
        backgroundColor,
      },
      title,
      description: shortDescription,
    };
  };

  const formats = {
    dayFormat: "DD/MM",
  };

  const components = {
    timeGutterHeader: () => null, // Remove time slots header
    timeSlotWrapper: () => null, // Remove time slots
    timeGutterWrapper: () => null,
    eventContainerWrapper: () => null,
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const views = {
    month: true,
    agenda: true,
  };

  return (
    <div className="attendance">
      <ParentHeader />
      <div className="attendance-content">
        <Parentsidebar />
        <div className="att-sheet">
          <div>
            <h1
              style={{
                textAlign: "center",
                color: "",
                fontWeight: "bolder",
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              Meeting Scheduler     
            </h1>
            <Calendar
              views={views}
              localizer={localizer}
              events={events}
              showAllEvents={true}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 , maxWidth: "100%", width: "auto" }}
              selectable={true}
              onSelectSlot={(slotInfo) =>
                console.log("Selected slot:", slotInfo)
              }
              onSelectEvent={handleEventClick}
              eventPropGetter={eventStyleGetter}
              formats={formats}
              components={components}
            />
            <Dialog open={Boolean(selectedEvent)} onClose={handleClosePopup}>
              <DialogTitle
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  color: '#ff3672',
                  fontWeight: "bolder",
                }}
              >
                {selectedEvent?.title}
              </DialogTitle>
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: '#ff3672',
                  
                }}
              >
                {selectedEvent?.studentName}
              </DialogTitle>
              <DialogContent>
                <p>
                  <span style={{ color: "blue" }}>Description:</span>
                  <br />
                  {selectedEvent?.description}
                </p>
              </DialogContent>
              <DialogContent>
                {selectedEvent?.fileUploads ? (
                  <>
                    <span style={{ marginLeft: "7px" }}></span>
                    <a
                      target="_blank"
                      href={`${IMAGE_URL}/${selectedEvent?.fileUploads}`}
                      download={`${selectedEvent?.fileUploads}`}
                      onClick={handleClosePopup}
                    >
                      View document
                    </a>
                  </>
                ) : (
                  <span>No file uploaded</span>
                )}
              </DialogContent>
              <DialogContent>
                <span style={{ color: "#18f060" }}>Meeting Date : </span>{" "}
                {selectedEvent?.start.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </DialogContent>
              {/* <DialogContent>
                <span style={{ color: "#f05118" }}>Last Date :</span>{" "}
                {selectedEvent?.end.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </DialogContent> */}

              <DialogActions>
                <Button onClick={handleClosePopup}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingScheduler;
