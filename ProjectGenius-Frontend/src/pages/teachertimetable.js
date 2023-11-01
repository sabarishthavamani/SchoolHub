import React from 'react'
import Sidebar from './components/sidebar';


const TimeTable = () =>{
    return(
        <div className="teacher">
 <Sidebar />
  <div className="teacher-content" style={{ background: "#f7f7f8" }}>
    <div className="header" style={{ width: "100%" }}>
      <div className="l-header">
        <p>New Teacher</p>
      </div>
      <div className="r-header" style={{ width: 600 }}>
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
      </div>
    </div>
    <div className="time-table-content">
      <div className="time-header">
        <p style={{ fontSize: 15, fontWeight: 600 }}>Time Table</p>
        <div className="time-buttons">
          <button style={{ color: "#605bff" }}>
            <i className="fa fa-pencil" style={{ marginRight: 10 }} />
            Edit
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
          <tr className="time-row">
            <td>Mon</td>
            <td>
              <div className="subject">
                <p>Class VII-B</p>
                <p>World History</p>
              </div>
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td>
              <div className="subject2">
                <p>Class VII-B</p>
                <p>Modern History</p>
              </div>
            </td>
            <td />
          </tr>
          <tr className="time-row">
            <td>Tue</td>
            <td />
            <td />
            <td>
              <div className="subject3">
                <p>Class X-A</p>
                <p>Ancient History</p>
              </div>
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr className="time-row">
            <td>Wed</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td>
              <div className="subject">
                <p>Class X-B</p>
                <p>World History</p>
              </div>
            </td>
            <td />
            <td />
          </tr>
          <tr className="time-row">
            <td>Thu</td>
            <td />
            <td>
              <div className="subject2">
                <p>Class VII-B</p>
                <p>Modern History</p>
              </div>
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr className="time-row">
            <td>Fri</td>
            <td />
            <td />
            <td />
            <td>
              <div className="subject3">
                <p>Class VI-C</p>
                <p>Ancient History</p>
              </div>
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr className="time-row">
            <td style={{ borderBottomLeftRadius: 10 }}>Sat</td>
            <td />
            <td />
            <td />
            <td />
            <td>
              <div className="subject">
                <p>Class V-A</p>
                <p>Social Studies</p>
              </div>
            </td>
            <td />
            <td />
            <td style={{ borderBottomRightRadius: 10 }} />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    )
}

export default TimeTable;