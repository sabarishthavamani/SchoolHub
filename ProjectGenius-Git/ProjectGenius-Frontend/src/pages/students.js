import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPencil, faTags, faTrash } from '@fortawesome/free-solid-svg-icons';
import { viewStudent, deleteStudent } from '../actions/userAction';

//lib
import toastAlert from '../lib/toast';

const Students = () => {
  const [data, setData] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState('');

  //navigate
  const navigate = useNavigate();
  const deletestudent = async (id) => {
    try {

      let { status, message } = await deleteStudent(id)

      if (status === true) {
        toastAlert('success', message)
        getData()

      } else if (status === false) {
        toastAlert('success', message)
      }

    } catch (err) {

    }
  }

  const getData = async () => {
    try {
      let { status, result, imageUrl } = await viewStudent();
      if (status === true) {
        setData(result)
        setIMAGE_URL(imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const editstudent = (id) => {
    navigate('/student-edit/' + id)
  }


  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="middle-header-left">
            <h4>Student Details</h4>
          </div>
          <div className="middle-header-right">
            <input type="search" placeholder="search" />
            <div className="dropdown filter">
              <img className="dropdown-toggle" data-bs-toggle="dropdown"
                src="images/filter.png"
                alt=""
                title="filter"

              />
              <ul id="filter-option" className="filt-opt dropdown-menu">
                <li>
                  <button
                    className="std-btn"
                  >
                    Student Name
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  >
                    Admission Date
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  >
                    Grade
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  >
                    Contact Number
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  > Fee Payment Due
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="std-table">
          <table className="std-info">
            <thead>
              <tr>
                <th>Name </th>
                <th>Student ID</th>
                <th>Grade</th>
                <th>Contact Number</th>
                <th>Admission Date</th>
                <th>Due Amount</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, key) => {
                  return (
                    <tr className="std-row" >
                      <td className="profile">
                        <a href={`${IMAGE_URL}/${item.photo}`} target="_blank">
                          <img src={`${IMAGE_URL}/${item.photo}`} alt="" />
                        </a>
                        <span key={key}>{item.name}</span>
                      </td>
                      <td>{item.studentId}</td>
                      <td>
                        <span className="grade">{item.admissiongrade}</span>
                      </td>
                      <td>+91{item.contactNumber}</td>
                      <td>{item.doj}</td>
                      <td>
                        <span className="due1">$9000</span>
                      </td>
                      <td className="edit" id="ed">
                        <div className="dropdown">
                          <FontAwesomeIcon icon={faEllipsis} className="dropdown-toggle" data-bs-toggle="dropdown" />
                          <ul className="dropdown-menu" style={{ background: "#fafafa" }}>
                            <li className="edit-box">
                              <a className="dropdown-item" href="#" style={{ color: "blue" }} onClick={() => editstudent(item._id)}>
                                <i className="fa fa-pencil" style={{ color: "blue" }} />
                                Edit
                              </a>
                            </li>
                            <li className="edit-box">
                              <a className="dropdown-item" href="#">
                                <i className="fa fa-tags" />
                                More
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#" style={{ color: "red" }} onClick={() => deletestudent(item._id)}>
                                <i
                                  className="fa fa-trash-o"
                                  style={{ color: "red", marginRight: 10 }}
                                />
                                Clear
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="student-right">
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
  );
};

export default Students;
