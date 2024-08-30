import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer,Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../src/reactcalendar.css";
import { findWholeClass, viewStudent } from "../actions/adminAction";
import { viewHomeWork } from "../actions/teacherAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "react-alert-confirm";
import StudentHeader from "./components/studentnavbar";
import Studentsidebar from "./components/studentsidebar";

const localizer = momentLocalizer(moment);

const HomeworkScheduler = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [IMAGE_URL, setIMAGE_URL] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem("STUDENT_DATA"));
        const StudentId = studentData ? studentData.studentId : "";

        const STDsection = await viewStudent();
        const singleStudentSection = STDsection.result2;
        const filterClass = singleStudentSection.find((data) =>
          data.students.some((student) => student.studentId === StudentId)
        );
        const filterGrade = filterClass.admissiongrade;
        const filterSection = filterClass.section;

        const teachClass = await findWholeClass();
        const classData = teachClass.result;
        const singleTeacherClass = classData.find((data) =>
          data.status.some(
            (each) =>
              each.className === filterGrade && each.role === "Class Teacher"
          )
        );
        const getTeacher = singleTeacherClass.name;

        const Homework = await viewHomeWork();
        const classHomework = Homework.result;
        const homeWorkFile = Homework.imageUrl;
        setIMAGE_URL(homeWorkFile);
        console.log(classHomework, "classHomework........");
        console.log(homeWorkFile, "homeWorkFile.......");

        const events = classHomework.flatMap((homework) =>
          homework.homeWork.map((work) => ({
            // title:` ${work.subject} ${""}${""} - ${""} ${work.description}`,
            title: work.subject,
            start: new Date(homework.assignDate),
            end: new Date(homework.dueDate),
            description: work.description,
            fileUploads: homework.fileUploads,
          }))
        );

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
  
    const shortDescription = event.description.length > descriptionLength
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
      <StudentHeader />
      <div className="attendance-content">
        <Studentsidebar />
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
              Homework Scheduler
            </h1>
            <Calendar
             views={views}
              localizer={localizer}
              events={events}
              showAllEvents={true}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
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
                  color: "yellowgreen",
                  fontWeight: "bolder",
                }}
              >
                {selectedEvent?.title}
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
                <span style={{ color: "#18f060" }}>Assign Date : </span>{" "}
                {selectedEvent?.start.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </DialogContent>
              <DialogContent>
                <span style={{ color: "#f05118" }}>Last Date :</span>{" "}
                {selectedEvent?.end.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </DialogContent>

              
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

export default HomeworkScheduler;
