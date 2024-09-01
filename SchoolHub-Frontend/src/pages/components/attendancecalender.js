import React, { useState } from "react";
import Calendar from "react-calendar";
import { IoMdPerson } from "react-icons/io";
import "react-calendar/dist/Calendar.css";

const AttendanceCalender = () => {
  const [date, setDate] = useState(new Date());

  const absentDatesFromDatabase = ["2024-01-10", "2024-02-15", "2024-02-22"];

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return absentDatesFromDatabase.includes(formattedDate)
      ? "absent-date"
      : null;
  };

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="bus-att">
        <div className="bus-att-info">
            <p className="bus-att-absent">Absent - {absentDatesFromDatabase.length}</p>
            <p className="bus-att-holidays"><span>8</span>Holidays</p>
        </div>
      <div className="react-calender-container">
        <span>
            <IoMdPerson />
        </span>
      <Calendar
        onChange={onChange}
        value={date}
        showNeighboringMonth={false}
        locale="en-US"
        tileClassName={tileClassName}
      />
      </div>
    </div>
  );
};

export default AttendanceCalender;
