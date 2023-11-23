import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar';
import { getTeacherSchedule } from '../actions/adminAction';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import toastAlert from '../lib/toast';


const TimeTable = () =>{
  const [data,setData] = useState();
  const {teacherId} = useParams()

  const getData = async (teacherId) => {
    try {
      const { status, result } = await getTeacherSchedule(teacherId);
      console.log(status, result, "--status, result");
      if (status === true) {
        console.log(result, "--result");
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    getData(teacherId);
  }, []);
  

console.log(data,'---data')

const navigate = useNavigate()

const renderBody = () => {
  return(
   (data && data.schedule=== undefined ? (
    <tbody>
      <tr>Schedule not assigned Yet</tr>
      </tbody>
   ):(
    data.schedule.map((item, index) => (
      <tr className="time-row" key={index}>
      <td>{item.day}</td>
      <td>
        <div className="subject">
          <p>{item.periods.period1.class} {item.periods.period1.section}</p>
          <p>{item.periods.period1.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject2">
          <p>{item.periods.period2.class} {item.periods.period2.section}</p>
          <p>{item.periods.period2.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject3">
          <p>{item.periods.period3.class} {item.periods.period3.section}</p>
          <p>{item.periods.period3.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject">
          <p>{item.periods.period4.class} {item.periods.period4.section}</p>
          <p>{item.periods.period4.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject2">
          <p>{item.periods.period5.class} {item.periods.period5.section}</p>
          <p>{item.periods.period5.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject3">
          <p>{item.periods.period6.class} {item.periods.period6.section}</p>
          <p>{item.periods.period6.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject">
          <p>{item.periods.period7.class} {item.periods.period7.section}</p>
          <p>{item.periods.period7.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject2">
          <p>{item.periods.period8.class} {item.periods.period8.section}</p>
          <p>{item.periods.period8.subject}</p>
        </div>
      </td>
    </tr>
    ))
   ))
  )
    }
 
    return(
        <div className="teacher">
 <Sidebar />
  <div className="teacher-content" style={{ background: "#f7f7f8" }}>
    <div className="header" style={{ width: "100%" }}>
      <div className="l-header">
        <p>Teacher Time Table</p>
      </div>
      {/* <div className="r-header" style={{ width: 600 }}>
        <input type="search" placeholder="search" />
        <img src="images/filter.png" />
        <a href="#" className="notify">
          <img
            src="images/bell.png"
            alt=""
            title="notification"
            style={{ height: 25 }}
          />
        </a>
        <a href="#" className="notify">
          <img
            src="images/setting.png"
            alt=""
            title="setting"
            style={{ height: 25 }}
          />
        </a>
        <div>
          <span>Sam Smith</span>
          <br />
          <span style={{ color: "#ccc" }}>Admin</span>
        </div>
        <img src="images/Profile photo.png" alt="" title="profile" />
      </div> */}
    </div>
    <div className="time-table-content">
      <div className="time-header">
        <p style={{ fontSize: 15, fontWeight: 600 }}>Time Table</p>
        <div className="time-buttons">
          <button style={{ color: "#605bff" }}>
            <i className="fa fa-pencil" style={{ marginRight: 10 }} />
            Edit
          </button>
          <button style={{ color: "#605bff" }} onClick={() =>{navigate('/teacherview')}} >
            <i className="fa fa-pencil" style={{ marginRight: 10 }} onClick={() =>{navigate('/teacherview')}} />
            Assign Schedule
          </button>
          <button style={{ color: "#ff80a6" }}>
            Weekly
            <i className="fa fa-caret-down caret" style={{ marginLeft: 10 }} />
          </button>
        </div>
      </div>
      <table className="time-table" border={1}>
        <thead>
          <tr className="time-head-row">
            <th>Day</th>
            <th>
              <span>1</span>
              <br />
              9.30-10.10AM
            </th>
            <th>
              <span>2</span>
              <br />
              10.20-11.00AM
            </th>
            <th>
              <span>3</span>
              <br />
              11.00-11.40AM
            </th>
            <th>
              <span>4</span>
              <br />
              11.40-12.10PM
            </th>
            <th>
              <span>5</span>
              <br />
              1.00-1.40PM
            </th>
            <th>
              <span>6</span>
              <br />
              1.40-2.10PM
            </th>
            <th>
              <span>7</span>
              <br />
              2.20-3.00PM
            </th>
            <th>
              <span>8</span>
              <br />
              3.00-3.40PM
            </th>
          </tr>
        </thead>
        <tbody>
            {data && renderBody()}
        </tbody>
      </table>
    </div>
  </div>
</div>

    )
}

export default TimeTable;