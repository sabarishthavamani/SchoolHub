import React from 'react'
import Sidebar from './components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const Students = () => {
  return(     
<div className="student-container">
  <Sidebar />
  <div className="middle-content">
    <div className="middle-header">
      <div className="middle-header-left">
        <h3>Student Details</h3>
      </div>
      <div className="middle-header-right">
        <input type="search" placeholder="search" />
        <div className="filter">
          <img
            src="images/filter.png"
            alt=""
            title="filter"
            onclick="showfilt();"
          />
          <ul id="filter-option" className="filt-opt">
            <li>
              <button
                onclick="select();"
                ondblclick="unselect()"
                className="std-btn"
              >
                <i className="fa fa-check tik" />
                Student Name
              </button>
            </li>
            <li>
              <button
                className="std-btn"
                onclick="select2();"
                ondblclick="unselect2()"
              >
                <i className="fa fa-check tik" />
                Admission Date
              </button>
            </li>
            <li>
              <button
                className="std-btn"
                onclick="select3();"
                ondblclick="unselect3()"
              >
                <i className="fa fa-check tik" />
                Grade
              </button>
            </li>
            <li>
              <button
                className="std-btn"
                onclick="select4();"
                ondblclick="unselect4()"
              >
                <i className="fa fa-check tik" />
                Contact Number
              </button>
            </li>
            <li>
              <button
                className="std-btn"
                onclick="select5();"
                ondblclick="unselect5()"
              >
                <i className="fa fa-check tik" />
                Fee Payment Due
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="std-table" onclick="hidefilt();">
      <table className="std-info">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Grade</th>
            <th>Contact Number</th>
            <th>Due Amount</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="std-row" onclick="infos()">
            <td className="profile">
              <img src="images/jhon.png" alt="" />
              <span>Jhon Deo</span>
            </td>
            <td>202347481A</td>
            <td>
              <span className="grade">A++</span>
            </td>
            <td>+91757005467</td>
            <td>
              <span className="due1">$9000</span>
            </td>
            <td className="edit" id="ed" onclick="edit();">
              <i className="fa fa-ellipsis-h" />
              <ul id="edit-option" className="edit-opt">
                <li>
                  <button style={{ color: "blue" }}>
                    <i className="fa fa-pencil" style={{ color: "blue" }} />
                    Edit
                  </button>
                </li>
                <li>
                  <button style={{ color: "#ccc" }}>
                    <i className="fa fa-tags" />
                    More
                  </button>
                </li>
                <li>
                  <button style={{ color: "red" }}>
                    <i className="fa fa-trash-o" style={{ color: "red" }} />
                    clear
                  </button>
                </li>
              </ul>
            </td>
          </tr>
          <tr className="std-row" onclick="infos()">
            <td className="profile">
              <img src="images/jhon.png" alt="" />
              <span>Jhon Deo</span>
            </td>
            <td>202347481A</td>
            <td>
              <span className="grade">A++</span>
            </td>
            <td>+91757005467</td>
            <td>
              <span className="due1">$9000</span>
            </td>
            <td className="edit" id="ed" onclick="edit();">
              <i className="fa fa-ellipsis-h" />
              <ul id="edit-option" className="edit-opt">
                <li>
                  <button style={{ color: "blue" }}>
                    <i className="fa fa-pencil" style={{ color: "blue" }} />
                    Edit
                  </button>
                </li>
                <li>
                  <button style={{ color: "#ccc" }}>
                    <i className="fa fa-tags" />
                    More
                  </button>
                </li>
                <li>
                  <button style={{ color: "red" }}>
                    <i className="fa fa-trash-o" style={{ color: "red" }} />
                    clear
                  </button>
                </li>
              </ul>
            </td>
          </tr>
          <tr className="std-row" onclick="infos()">
            <td className="profile">
              <img src="images/jhon.png" alt="" />
              <span>Jhon Deo</span>
            </td>
            <td>202347481A</td>
            <td>
              <span className="grade">A++</span>
            </td>
            <td>+91757005467</td>
            <td>
              <span className="due1">$9000</span>
            </td>
            <td className="edit" id="ed" onclick="edit();">
              <i className="fa fa-ellipsis-h" />
              <ul id="edit-option" className="edit-opt">
                <li>
                  <button style={{ color: "blue" }}>
                    <i className="fa fa-pencil" style={{ color: "blue" }} />
                    Edit
                  </button>
                </li>
                <li>
                  <button style={{ color: "#ccc" }}>
                    <i className="fa fa-tags" />
                    More
                  </button>
                </li>
                <li>
                  <button style={{ color: "red" }}>
                    <i className="fa fa-trash-o" style={{ color: "red" }} />
                    clear
                  </button>
                </li>
              </ul>
            </td>
          </tr>
          {/* <tr class="std-row">
                      <td class="profile"><img src="images/women.png" alt=""><span>Shelby Goode</span></td>
                      <td>202285486B</td>
                      <td><span class="grade">B+</span></td>
                      <td>+91757005467</td>
                      <td><span class="due2">No Due</span></td>
                      <td class="edit" id="ed" onclick="edit();">
                          <i class="fa fa-ellipsis-h"></i>
                          <ul id="edit-option" class="edit-opt">
                              <li style="color: blue;"><i class="fa fa-pencil" style="color: blue;"></i>Edit</li>
                              <li style="color: #ccc;"><i class="fa fa-tags"></i>More</li>
                              <li style="color: red;"><i class="fa fa-trash-o" style="color: red;"></i>clear</li>
                          </ul>
                      </td>
                  </tr> */}
        </tbody>
      </table>
    </div>
  </div>
  <div className="student-right" onclick="hide();hidefilt();">
    <div className="std-personal-info" id="information">
      <div className="std-image">
        <img src="images/std.png" alt="" />
      </div>
      <div className="std-name">
        <span>JHON DEO</span>
      </div>
      <div className="std-history">
        <div className="adrs">
          <i className="fa fa-envelope-o" />
          <span>kajope5182@gmail.com</span>
        </div>
        <div className="adrs">
          <i className="fa fa-phone" />
          <span>(+91)33757005467</span>
        </div>
        <div className="adrs">
          <i className="fa fa-address-card-o" />
          <span>2239 Hog Camp Road Schaumburg</span>
        </div>
      </div>
    </div>
  </div>
</div>


)}
export default Students;