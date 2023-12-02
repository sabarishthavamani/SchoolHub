import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment);

const teacherAttendanceEvents = [
  {
    id: 1,
    title: "Present",
    start: new Date(2023, 11, 1),
    end: new Date(2023, 11, 1),
  },
  {
    id: 2,
    title: "Absent",
    start: new Date(2023, 11, 2), 
    end: new Date(2023, 11, 2),
  },
  {
    id: 3,
    title: "Holiday",
    start: new Date(2023, 11, 3), 
    end: new Date(2023, 11, 3),
  },
  {
    id: 4,
    title: "Present",
    start: new Date(2023, 11, 4), 
    end: new Date(2023, 11, 4),
  },
  {
    id: 5,
    title: "Present",
    start: new Date(2023, 11, 5), 
    end: new Date(2023, 11, 5),
  },
  {
    id: 6,
    title: "Present",
    start: new Date(2023, 11, 6), 
    end: new Date(2023, 11, 6),
  },
  {
    id: 7,
    title: "Present",
    start: new Date(2023, 11, 7), 
    end: new Date(2023, 11, 7),
  },
  {
    id: 8,
    title: "Present",
    start: new Date(2023, 11, 8), 
    end: new Date(2023, 11, 8),
  },
  {
    id: 9,
    title: "Present",
    start: new Date(2023, 11, 9), 
    end: new Date(2023, 11, 9),
  },
  {
    id: 10,
    title: "Holiday",
    start: new Date(2023, 11, 10), 
    end: new Date(2023, 11, 10),
  },
  {
    id: 11,
    title: "Present",
    start: new Date(2023, 11, 11), 
    end: new Date(2023, 11, 11),
  },
  {
    id: 12,
    title: "Present",
    start: new Date(2023, 11, 12), 
    end: new Date(2023, 11, 12),
  },
  {
    id: 13,
    title: "Present",
    start: new Date(2023, 11, 13), 
    end: new Date(2023, 11, 13),
  },
  {
    id: 14,
    title: "Absent",
    start: new Date(2023, 11, 14), 
    end: new Date(2023, 11, 16),
  },
  {
    id: 15,
    title: "Holiday",
    start: new Date(2023, 11, 17), 
    end: new Date(2023, 11, 17),
  },
  {
    id: 16,
    title: "Present",
    start: new Date(2023, 11, 18), 
    end: new Date(2023, 11, 18),
  },
  {
    id: 17,
    title: "Present",
    start: new Date(2023, 11, 19), 
    end: new Date(2023, 11, 19),
  },
  {
    id: 18,
    title: "Present",
    start: new Date(2023, 11, 20), 
    end: new Date(2023, 11, 20),
  },
  {
    id: 19,
    title: "Present",
    start: new Date(2023, 11, 21), 
    end: new Date(2023, 11, 21),
  },
  {
    id: 20,
    title: "Present",
    start: new Date(2023, 11, 22), 
    end: new Date(2023, 11, 22),
  },
  {
    id: 21,
    title: "Holiday",
    start: new Date(2023, 11, 23), 
    end: new Date(2023, 11, 24),
  },
  {
    id: 22,
    title: "Holiday",
    start: new Date(2023, 11, 24), 
    end: new Date(2023, 11, 24),
  },
  {
    id: 23,
    title: "Present",
    start: new Date(2023, 11, 25), 
    end: new Date(2023, 11, 25),
  },
];

const eventStyleGetter = (event) => {
  let style = {
    backgroundColor: event.title === 'Holiday' ? '#e2a92550' : event.title === 'Present' ? '#2cff974f' : '#f9333350',
    color: event.title === 'Holiday' ? '#dd9b00' : event.title === 'Present' ? '#43a666' : '#f93333',
    borderRadius: '16px',
    border: 'none',
    textAlign: 'center',
  };

  return {
    style: style,
  };
};

const Attendance = () => {
  return (
        <div className="teacher-attendance" style={{boxShadow: '1px 3px 10px 4px #00000040' }}>
          <Calendar
            localizer={localizer}
            events={teacherAttendanceEvents}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
          />
        </div>
  );
};

export default Attendance;
